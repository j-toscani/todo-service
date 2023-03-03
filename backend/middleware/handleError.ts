import { Request, Response, NextFunction } from "express";
import { ApiError, BadRequestError, InternalServerError } from "../lib/ApiError.js";
import { sendError } from "../lib/responseSender.js";
import logger from "../lib/logger.js";
import { ZodError } from "zod";

export default function handleError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      error = new BadRequestError(error.issues.map(issue => `Incorrect value for [${issue.path.join(" -> ")}]`).join("\n"));
    }

    const apiError =
      error instanceof ApiError
        ? error
        : new InternalServerError(error.message);

    sendError(res, apiError);
    logger.error(`${req.method}: ${req.path} - ${apiError.format()}`);
  }