import dotenv from "dotenv";
import app from "./server";
import { connectToDb } from "./db";
import logger from "./logger";

dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL || "";
const DB_NAME = process.env.DB_NAME || "todos";

connectToDb(DB_URL, DB_NAME)
  .then(startServer)
  .catch(logger.error);

function startServer() {
  app.listen(PORT, () => logger.info(`Server started at ${PORT}`));
}
