import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ResponseErrorInterface, ResponseInterface } from "../../shared/types/response.interface";
import { TaskInterface } from "../types/task.interface";
import { CreateTaskInterface } from "../types/createTask.interface";


export const taskActions = createActionGroup({
    source: 'Task',
    events: {
        'Get All Tasks': emptyProps(),
        'Get All Tasks Success': props<ResponseInterface<[TaskInterface]>>(),
        'Get All Tasks Failure': props<ResponseErrorInterface>(),
        'Get Single Task': props<{ id: number }>(),
        'Get Single Task Success': props<ResponseInterface<TaskInterface>>(),
        'Get Single Task Failure': props<ResponseErrorInterface>(),
        'Add Task': props<CreateTaskInterface>(),
        'Add Task Success': props<ResponseInterface<TaskInterface>>(),
        'Add Task Failure': props<ResponseErrorInterface>(),
        'Delete Task': props<{ id: number }>(),
        'Delete Task Success': props<ResponseInterface<{ id: number }>>(),
        'Delete Task Failure': props<ResponseErrorInterface>(),
        'Update Task': props<{ id: number, task: CreateTaskInterface }>(),
        'Update Task Success': props<ResponseInterface<TaskInterface>>(),
        'Update Task Failure': props<ResponseErrorInterface>(),
    }
})