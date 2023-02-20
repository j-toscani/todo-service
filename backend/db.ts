import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { ObjectId } from "bson";
import dotenv from "dotenv";

let client: MongoClient;

dotenv.config();

const DB_URL = process.env.DB_URL || "";
const DB_NAME = process.env.DB_NAME || "todos";

export async function connectToDb() {
    client = new MongoClient(DB_URL, { serverApi: ServerApiVersion.v1 });
    await client.connect();
}

export function getDb() {
    return client.db(DB_NAME);
}

export function getCollection<T extends { _id?: ObjectId}>(name: string): Collection<T> {
    return client.db(DB_NAME).collection<T>(name);
}