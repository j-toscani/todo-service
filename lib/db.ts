import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { ObjectId } from "bson";
import dotenv from "dotenv";
import { setTodoSchema } from "../models/ToDo.model";

let client: MongoClient;

dotenv.config();

const DB_URL = process.env.DB_URL || "";
const DB_UPDATE_SCHEMA = process.env.DB_UPDATE_SCHEMA ?? "no-update";
const DB_NAME = process.env.DB_NAME || "todos";

export async function connectToDb() {
    client = new MongoClient(DB_URL, { serverApi: ServerApiVersion.v1 });
    await client.connect();

    if(DB_UPDATE_SCHEMA === "update"){
        await setTodoSchema();
    }
}

export function getDb() {
    return client.db(DB_NAME);
}

export function getCollection<T extends { _id?: ObjectId}>(name: string): Collection<T> {
    return client.db(DB_NAME).collection<T>(name);
}