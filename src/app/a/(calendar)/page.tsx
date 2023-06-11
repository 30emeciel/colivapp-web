import "server-only";
import Client from "./client";
import {app_db} from "utils/mongo_utils";
import {add, parseISO} from 'date-fns'
import 'polyfills.types'
import {Reservation, ReservationStatus, User} from "types";


async function getReservations(StartDate: Date, EndDate: Date) {
    return app_db.collection<Reservation>("reservations")
        .find({
            start_date: {
                $gte: StartDate,
                $lt: EndDate,
            },
            status: ReservationStatus.Confirmed
        })
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

    let StartDate = parseDateOrDefault(searchParams.start_date, add(new Date(), {months: -2}))
    let EndDate = parseDateOrDefault(searchParams.end_date, add(new Date(), {months: 12}))
    let reservations = await getReservations(StartDate, EndDate)
    let users = await getUsers()

    let usersById = users.groupByToMapUnique((it) => it._id)

    return <Client usersById={usersById} reservations={reservations} data-superjson/>

}
