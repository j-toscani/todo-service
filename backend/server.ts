import express from "express";
import logRequest from "./middleware/logRequest";
import handleError from "./middleware/handleError";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(logRequest);

app.use(handleError);

app.use(router);

export default app;
