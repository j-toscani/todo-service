import { ObjectId } from "bson";
import { Request, Response, Router } from "express";
import asyncHandler from "../lib/asyncHandler";
import { ToDoStatus } from "../models/ToDo.model";
import ToDoRepository from "../repositories/ToDo.repository";

const router = Router();

router.get("/", asyncHandler(getTodos));
router.post("/", asyncHandler(upsertTodo));
router.get("/:id", getTodo);
router.delete("/:id", deleteTodo);

export default router;

async function getTodos(req: Request, res: Response) {
  const repository = new ToDoRepository();
  const todos = await repository.getMany({});
  res.send(todos);
}

async function getTodo(req: Request, res: Response) {
  const { params } = req;
  const repository = new ToDoRepository();
  const todo = await repository.getOne({ _id: new ObjectId(params.id) });
  res.send(todo);
}

async function deleteTodo(req: Request, res: Response) {
  const { params } = req;
  const repository = new ToDoRepository();
  const result = await repository.delete({ _id: new ObjectId(params.id) });
  res.send(result);
}

async function upsertTodo(req: Request, res: Response) {
  const data = createDefaultTodo(req.body.data);
  const repository = new ToDoRepository();
    const result = await repository.update(data._id ? { _id: data._id } : {}, {
        $set: data,
    });
    res.send(result);
}

function createDefaultTodo(data: Record<string, any>) {
  const {
    _id,
    createdAt = (new Date()).toString(),
    status = ToDoStatus.NEW,
    title,
    description,
    completedAt,
  } = data;

  return { createdAt, status, title, description, ...(completedAt && {completedAt}) , _id };
}
