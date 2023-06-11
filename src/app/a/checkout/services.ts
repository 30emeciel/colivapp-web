import {app_db} from "utils/mongo_utils";
import {Reservation, ReservationStatus} from "types";

export async function getReservations(user_id: string) {
    return app_db.collection<Reservation>("reservations")
        .find({
            user_id: user_id,
            status: ReservationStatus.Created
        })
        .toArray();
}
