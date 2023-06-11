import Client from "./client";
import {getReservations} from "./services";
import {headers} from "next/headers";

export default async function Page() {
    let user_id = headers().get("user_id")!
    return <>
        <h1>Panier</h1>
        <Client reservations={await getReservations(user_id)} />

    </>

}
