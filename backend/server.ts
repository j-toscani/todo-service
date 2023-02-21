import express from "express";
import logger from "./logger";
import router from "./routes";

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
    try {
        next()
    } catch (error) {
        next(error)
    }
})

app.use((req, _res, next) => {
    const { path, method } = req;
    logger.info(`[${method}]: ${path}`);
    next();
})
app.use(router);

export default app;