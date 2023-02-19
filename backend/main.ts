import dotenv from "dotenv";
import app from "./server";
import { connectToDb } from "./db";

dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL || "";
const DB_NAME = process.env.DB_NAME || "todos";

console.log(DB_NAME, DB_URL)

connectToDb(DB_URL, DB_NAME).then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`)
    })
}).catch(err => console.error(err))