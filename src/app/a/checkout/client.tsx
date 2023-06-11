'use client';
import {Col, List, Row} from "antd";
import {WithId} from "mongodb";
import {Reservation} from "types";
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import {useEffect, useRef} from "react";
import {startCheckout} from "./actions";

const ADYEN_ENVIRONMENT = process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT!
const ADYEN_CLIENT_KEY = process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY!

export default function Client({reservations} : {reservations:WithId<Reservation>[]}) {

    const paymentContainer = useRef(null);
    const configuration = {
        environment: 'test', // Change to 'live' for the live environment.
        clientKey: ADYEN_CLIENT_KEY, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        analytics: {
            enabled: false // Set to false to not send analytics data to Adyen.
        },
        locale: "fr-FR",
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        /*paymentMethodsConfiguration: {
            card: {
                hasHolderName: true,
                holderNameRequired: true,
                billingAddressRequired: true
            }
        }*/
    };

    useEffect(() => {
        // only for dev env. https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
        let ignore = false;
        const createCheckout = async () => {
            if (!paymentContainer.current) {
                return
            }
            const {session_id, session_data} = await startCheckout()
            const checkout = await AdyenCheckout({
                ...configuration,
                session: {
                    id: session_id, // Unique identifier for the payment session.
                    sessionData: session_data // The payment session data.
                },
                onPaymentCompleted: (response, _component) => {
                    //navigate(getRedirectUrl(response.resultCode), { replace: true }),
                },
                onError: (error, _component) => {
                    console.error(error);
                    //navigate(`/status/error?reason=${error.message}`, { replace: true });
                },
            })

            // The 'ignore' flag is used to avoid double re-rendering caused by React 18 StrictMode
            // More about it here: https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data
            checkout.create('dropin').mount(paymentContainer.current);
        }
        ignore || createCheckout();
        return () => {
            ignore = true
        }
    })


    return <>
        <Row gutter={16}>
            <Col flex="auto">
                <List
                    itemLayout="horizontal"
                    dataSource={reservations}
                    renderItem={(item, index) => (
                        <List.Item key={item._id}>
                            <List.Item.Meta
                                title={item._id}
                                description={`${item.start_date.toLocaleString()} ${item.end_date.toLocaleString()}`}
                            />
                            <div>100,00€</div>
                        </List.Item>
                    )}
                />
            </Col>
            <Col flex="600px">
                <div ref={paymentContainer} ></div>
            </Col>
        </Row>
    </>
}
