import express from "express";
import logRequest from "./middleware/logRequest";
import handleError from "./middleware/handleError";
import router from "./routes";
import cors from "cors";

const app = express();
app.use(cors({ origin: '*'}))
app.use(express.json());
app.use(logRequest);

app.use(router);
app.use(handleError);

export default app;
