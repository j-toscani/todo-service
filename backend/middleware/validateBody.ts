import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "../lib/ApiError.js";

export default function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!("data" in req.body)) {
      next(new BadRequestError("Missing 'data' property in body."));
    }
    
    schema.parse(req.body.data);
    next();
  };
}
