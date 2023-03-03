import { z } from "zod";
import createSetModelSchema from "../lib/createSetModelSchema.js";

export const COLLECTION_NAME = "todos";
export enum ToDoStatus {
  NEW = "new",
  DONE = "done"
}

export const ToDoSchema = z.object({
  createdAt: z.string(),
  compleatedAt: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.enum([ToDoStatus.NEW, ToDoStatus.DONE])
})

export type ToDoModel = z.infer<typeof ToDoSchema>

export const schema = {
  bsonType: "object",
  title: "A description of a ToDo",
  required: ["title", "status", "description"],
  properties: {
    title: {
      bsonType: "string",
      description: "Concise summary of todo. Must be string and is required.",
    },
    status: {
      enum: [ToDoStatus.NEW, ToDoStatus.DONE],
      description: "Describes the status the todo is in. Is required.",
    },
    description: {
      bsonType: "string",
      description: "A full description of what has to be done. Is required.",
    },
    completedAt: {
      bsonType: "string",
      description: "A string representation of when the ToDo was completed.",
    },
    createdAt: {
      bsonType: "string",
      description: "A string representation of when the ToDo was created.",
    },
  },
};

export const setTodoSchema = createSetModelSchema(COLLECTION_NAME, schema) 
