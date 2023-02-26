import { ObjectId } from "bson";
import createSetModelSchema from "../lib/createSetModelSchema";

export const COLLECTION_NAME = "todos";

export enum ToDoStatus {
  NEW = "new",
  DONE = "done",
}

export type ToDoModel = {
  _id?: ObjectId;
  createdAt: string;
  completedAt?: string;
  title: string;
  description: string;
  status: ToDoStatus;
};

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
      enum: [ToDoStatus.DONE, ToDoStatus.NEW],
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
