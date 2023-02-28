export enum ToDoStatus {
    NEW = "new",
    DONE = "done",
  }

export interface ApiToDo {
    title: string,
    description: string,
    status: ToDoStatus,
}