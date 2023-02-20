import { COLLECTION_NAME, ToDoModel } from "../models/ToDo.model";
import { BaseRepository } from "./Base.repository";

export default class ToDoRepository extends BaseRepository<ToDoModel> {
  constructor() {
    super(COLLECTION_NAME);
  }
}