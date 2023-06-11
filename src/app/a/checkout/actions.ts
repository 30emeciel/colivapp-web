'use server'
import {headers} from "next/headers";
import {ADYEN_MERCHANT_ACCOUNT, checkout} from "utils/adyen";
import {differenceInCalendarDays} from "date-fns";
import {getReservations} from "./services";
import {sum} from "lodash-es";

export async function startCheckout() {
    'use server'
    let user_id = headers().get("user_id")!

    const reservations = await getReservations(user_id)
    const pricePerDayInEuros = 30
    const amounts = reservations.map((reservation => differenceInCalendarDays(reservation.end_date, reservation.start_date) * pricePerDayInEuros * 100))
    const amount = sum(amounts)


    const checkout_resp = await checkout.sessions({
        amount: { currency: "EUR", value: amount },
        reference: "YOUR_PAYMENT_REFERENCE",
        returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
        merchantAccount: ADYEN_MERCHANT_ACCOUNT,
        countryCode: 'fr',
        shopperLocale: "fr-FR",
    })
    return {
        session_id: checkout_resp.id,
        session_data: checkout_resp.sessionData
    }

}
