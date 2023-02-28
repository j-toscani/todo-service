import { Response } from "express";
import logger from "./logger";
import { ApiError } from "./ApiError";

function sendResponse<T>(res: Response, status: number, data: T) {
    res.status(status).send(data);
}

export function sendSuccess<T>(res: Response, data: T) {
    sendResponse<T>(res, 200, data);
}

export function sendCreated<T>(res: Response, data: T) {
    sendResponse<T>(res, 201, data)
}

export function sendEmpty<T>(res: Response, data: T) {
    sendResponse(res, 204, Array.isArray(data) ? [] : {})
}

export function sendError<T extends ApiError>(res: Response, error: T) {
    res.status(error.statusCode).send({messsage: error.format()})
}