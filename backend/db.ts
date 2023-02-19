import { MongoClient, ServerApiVersion } from "mongodb";

export let connection: MongoClient;

export async function connectToDb(dbUrl: string, dbName:string) {
    const client = new MongoClient(dbUrl, { serverApi: ServerApiVersion.v1 });
    connection = await client.connect();

    return connection.db(dbName);
}