import { z } from "zod";
import createSetModelSchema from "../lib/createSetModelSchema.js";

export const COLLECTION_NAME = "todos";

export const ToDoSchema = z.object({
  createdAt: z.string().optional(),
  compleatedAt: z.string().optional(),
  title: z.string(),
  description: z.string(),
  done: z.boolean(),
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
    done: {
      bsonType: "boolean",
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
