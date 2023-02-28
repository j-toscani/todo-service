import { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";

export default function logRequest(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { path, method } = req;
  logger.info(`[${method}]: ${path}`);
  next();
}
