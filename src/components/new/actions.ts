'use server'
import {headers} from "next/headers";

import {OptionalId} from "mongodb";
import {Reservation, ReservationStatus} from "types";
import {app_db} from "utils/mongo_utils";

export async function createOwnReservation(user_reservation: Pick<Reservation, "start_date" | "end_date">) {
    'use server'
    let user_id = headers().get("user_id")!

    console.log("createReservation user_id " + user_id + " start_date" + user_reservation.start_date.toDateString())
    const reservation : Reservation = {
        status: ReservationStatus.Created,
        start_date: user_reservation.start_date,
        end_date: user_reservation.end_date,
        user_id: user_id,
        created_by: user_id,
    }
    await app_db.collection<OptionalId<Reservation>>("reservations").insertOne(reservation)

    /*const pricePerDayInEuros = 30
    const amount = differenceInCalendarDays(reservation.end_date, reservation.start_date) * pricePerDayInEuros * 100

    const checkout_resp = await checkout.sessions({
        amount: { currency: "EUR", value: amount },
        reference: "YOUR_PAYMENT_REFERENCE",
        returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
        merchantAccount: ADYEN_MERCHANT_ACCOUNT,
    })
    return checkout_resp.sessionData!
    */
}
