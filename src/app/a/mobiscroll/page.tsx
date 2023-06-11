
import 'server-only'

import Client from "./client";
import {app_db} from "../../../utils/mongo_utils";
import {Reservation, ScheduleEvent, User} from "types";
import {endOfMonth, parseISO, startOfMonth} from "date-fns";
import {headers} from "next/headers";
import {OptionalId} from "mongodb";
import {MbscCalendarEvent} from "@mobiscroll/react/dist/src/core/shared/calendar-view/calendar-view.types";


async function getReservations(StartDate: Date, EndDate: Date) {
    return app_db.collection<Reservation>("reservations")
        .find({start_date: {
                $gte: StartDate,
                $lt: EndDate
            }})
        .toArray();
}


async function getUsers() {
    return app_db.collection<User>("users")
        .find({})
        .toArray();
}



export default async function App({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {

    function parseDateOrDefault(date_string: string | string[] | undefined, d: Date) {
        if (date_string && typeof date_string == "string") {
            return parseISO(date_string)
        }
        return d
    }

    async function createReservation(reservation: Reservation) {
        'use server'
        let userId = headers().get("userId")!

        console.log("createReservation userId " + userId)
        reservation.created_by = "645d2742ddf55e68f7647297"
        await app_db.collection<OptionalId<Reservation>>("reservations").insertOne(reservation)
    }
    async function deleteReservation(reservation_id: string) {
        'use server'
        let userId = headers().get("userId")!

        console.log("deleteReservation userId " + userId)
        await app_db.collection<OptionalId<Reservation>>("reservations").deleteOne({_id: reservation_id})
    }

    let StartDate = parseDateOrDefault(searchParams.start_date, startOfMonth(new Date()))
    let EndDate = parseDateOrDefault(searchParams.end_date, endOfMonth(new Date()))
    let reservations = await getReservations(StartDate, EndDate)
    let users = await getUsers()



    return <Client createReservation={createReservation} deleteReservation={deleteReservation} users={users} reservations={reservations} data-superjson/>
}
