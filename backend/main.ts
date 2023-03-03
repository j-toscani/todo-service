import dotenv from "dotenv";
import app from "./server.js";
import { connectToDb } from "./lib/db.js";
import logger from "./lib/logger.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

connectToDb()
  .then(startServer)
  .catch(logger.error);

function startServer() {
  app.listen(PORT, () => logger.info(`Server started at ${PORT}`));
}
