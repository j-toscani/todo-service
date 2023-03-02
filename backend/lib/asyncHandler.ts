import { NextFunction, Request, Response } from "express";

export default function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => any
) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);
}
