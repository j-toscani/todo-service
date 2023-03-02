import { ObjectId } from "bson";
import { Request, Response, Router } from "express";
import { NotFoundError } from "../lib/ApiError.js";
import asyncHandler from "../lib/asyncHandler.js";
import { sendEmpty, sendError, sendSuccess } from "../lib/responseSender.js";
import { ToDoStatus } from "../models/ToDo.model.js";
import ToDoRepository from "../repositories/ToDo.repository.js";

const router = Router();

router.get("/", asyncHandler(getTodos));
router.post("/new", asyncHandler(createTodo));
router.post("/:id", asyncHandler(updateTodo));
router.get("/:id", asyncHandler(getTodo));
router.delete("/:id", asyncHandler(deleteTodo));

export default router;

async function getTodos(_req: Request, res: Response) {
  const repository = new ToDoRepository();

  const todos = await repository.getMany({});

  if (todos) {
    sendSuccess(res, todos);
  } else {
    sendEmpty(res, []);
  }
}

async function getTodo(req: Request, res: Response) {
  const { params } = req;
  const repository = new ToDoRepository();

  const todo = await repository.getOne({ _id: new ObjectId(params.id) });

  if (todo) {
    sendSuccess(res, todo);
  } else {
    throw new NotFoundError(`Cannot GET todo with id [${params.id}]`);
  }
}

async function deleteTodo(req: Request, res: Response) {
  const { params } = req;
  const repository = new ToDoRepository();
  const result = await repository.delete({ _id: new ObjectId(params.id) });
  sendSuccess(res, result);
}

async function createTodo(req: Request, res: Response) {
  const repository = new ToDoRepository();
  const data = createDefaultTodo(req.body.data);
  
  const result = await repository.create(data);
  sendSuccess(res, result);
}

async function updateTodo(req: Request, res: Response) {
  const { params } = req;

  const repository = new ToDoRepository();
  const result = await repository.update({ _id: new ObjectId(params.id) }, {
    $set: req.body.data,
  });
  sendSuccess(res, result)
}

function createDefaultTodo(data: Record<string, any>) {
  const {
    _id,
    createdAt = new Date().toString(),
    status = ToDoStatus.NEW,
  } = data;

  return {
    ...data,
    createdAt,
    title: data.title ?? "",
    description: data.description ?? "",
    status,
    _id,
  };
}
