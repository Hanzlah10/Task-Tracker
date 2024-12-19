import { ResponseErrorInterface } from "../../shared/types/response.interface";
import { TaskInterface } from "./task.interface";

export interface taskStateInterface {
    tasks: TaskInterface[];
    error: ResponseErrorInterface | null;
    message: string | null | undefined;
    selectedTask: TaskInterface | null | undefined;
}