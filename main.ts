import dotenv from "dotenv";
import app from "./server";
import { connectToDb } from "./lib/db";
import logger from "./lib/logger";

dotenv.config();
const PORT = process.env.PORT || 3001;

connectToDb()
  .then(startServer)
  .catch(logger.error);

function startServer() {
  app.listen(PORT, () => logger.info(`Server started at ${PORT}`));
}
