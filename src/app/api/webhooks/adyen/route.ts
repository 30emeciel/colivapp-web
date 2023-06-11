import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import {NextResponse} from "next/server";
import {hmacValidator} from "@adyen/api-library";
import NotificationRequest from "@adyen/api-library/lib/src/notification/notificationRequest";

const hmacKey = process.env.ADYEN_WEBHOOK_HMAC_KEY!
const validUsername = process.env.ADYEN_WEBHOOK_USER!
const validPassword = process.env.ADYEN_WEBHOOK_PASSWORD!

import * as auth from 'http-auth';
import HmacValidator from "@adyen/api-library/lib/src/utils/hmacValidator";
const basic = auth.basic({
    realm: 'Secure Area',

},(username, password, callback) => {
    if (username === validUsername && password === validPassword) {
        // Credentials are valid
        callback(true);
    } else {
        // Credentials are invalid
        callback(false);
    }
});
export async function POST(request: Request) {
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
        return new NextResponse("unauthorized", { status: 401})
    }
    const credentials = authHeader.replace('Basic ', '');
    const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf8');
    const [username, password] = decodedCredentials.split(':');

    if (!(username === validUsername && password === validPassword)) {
        // Credentials are invalid
        return new NextResponse("unauthorized", { status: 401})
    }

    // Notification Request JSON
    const notificationRequest:NotificationRequest = await request.json();
    const notificationRequestItems = notificationRequest.notificationItems

    if (!notificationRequestItems) {
        console.log("Empty NotificationRequest");
    }
    else {
        const validator = new HmacValidator()
        // Handling multiple notificationRequests
        notificationRequestItems.forEach((notificationRequestItem) => {
            // types bug
            notificationRequestItem = (notificationRequestItem as any).NotificationRequestItem
            // Handle the notification
            if (validator.validateHMAC(notificationRequestItem, hmacKey)) {
                // Process the notification based on the eventCode
                const eventCode = notificationRequestItem.eventCode;

            } else {
                // Non valid NotificationRequest
                console.error("Non valid NotificationRequest");
                throw "Non valid NotificationRequest"
            }
        })
    }
    return new NextResponse("[accepted]")
}



