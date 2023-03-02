import express from "express";
import logRequest from "./middleware/logRequest.js";
import handleError from "./middleware/handleError.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(cors({ origin: '*'}))
app.use(express.static("frontend"))
app.use(express.json());
app.use(logRequest);

app.use(router);
app.use(handleError);

export default app;
