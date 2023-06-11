import {MongoClient, ObjectId, OptionalId, ServerApiVersion} from "mongodb";

const uri = "mongodb+srv://colivapp-web:jcjQM4fNjC22GLvt@colivapp-web.9dcp0bx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const mongo_client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    pkFactory: {
        createPk: () => new ObjectId().toString(),
    }

});

export const app_db = mongo_client.db("colivapp")
