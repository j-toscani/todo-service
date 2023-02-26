import { Request, Response } from "express";
import { ApiError, BadRequestError, InternalServerError } from "../lib/ApiError";
import { sendError } from "../lib/responseSender";
import logger from "../logger";

export default function handleError(
    error: Error | ApiError,
    req: Request,
    res: Response,
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