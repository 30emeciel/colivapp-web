import "server-only";
import React from 'react';
import {MongoClient, ServerApiVersion} from "mongodb";




function getData() {
    return mongo_client.db("sample_restaurants").collection<Restaurant>("restaurants")
        .find({})
        .limit(10)
        .toArray();
}

import Listing from "./listing";
import {mongo_client} from "../../utils/mongo_utils";



export default async function Page() {

    const collection = await getData();

    return <>
        <h1>Hello World! </h1>
        <Listing collection={collection} data-superjson/>
    </>
}