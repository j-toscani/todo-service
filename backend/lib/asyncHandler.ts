import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import {
  ApiError,
  BadRequestError,
  InternalServerError,
} from "./ApiError";
import { sendError } from "./responseSender";

export default function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => any
) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);
}
