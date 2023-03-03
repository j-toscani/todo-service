import { ObjectId } from "bson";
import { COLLECTION_NAME, ToDoModel } from "../models/ToDo.model.js";
import { BaseRepository } from "./Base.repository.js";

export default class ToDoRepository extends BaseRepository<ToDoModel & {_id?: ObjectId}> {
  constructor() {
    super(COLLECTION_NAME);
  }
}