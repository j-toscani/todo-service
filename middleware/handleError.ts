import { NextFunction } from "connect";
import { Request, Response } from "express";
import { ApiError, BadRequestError, InternalServerError } from "../lib/ApiError";
import { sendError } from "../lib/responseSender";
import logger from "../lib/logger";

export default function handleError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if ((error.message = "Document failed validation")) {
      error = new BadRequestError(error.message);
    }

    const apiError =
      error instanceof ApiError
        ? error
        : new InternalServerError(error.message);

    sendError(res, apiError);
    logger.error(`${req.method}: ${req.path} - ${apiError.format()}`);
  }