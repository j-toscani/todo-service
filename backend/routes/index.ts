import { Router } from "express";
import todoRouter from "./todos.js";

const router = Router();

router.get("/", (_req, res) => {
    res.send("Hello from '/'")
})

router.use("/todo", todoRouter);

export default router;