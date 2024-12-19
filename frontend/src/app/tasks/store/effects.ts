import { Actions, createEffect, ofType } from "@ngrx/effects";
import { taskService } from "../services/tasks.service";
import { inject } from "@angular/core";
import { taskActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { TaskInterface } from "../types/task.interface";
import { ResponseErrorInterface, ResponseInterface } from "../../shared/types/response.interface";

export const getAllTasksEffect = createEffect(
    (
        actions$ = inject(Actions),
        TaskService = inject(taskService),
    ) => {
        return actions$.pipe(
            ofType(taskActions.getAllTasks),
            switchMap(() =>
                TaskService.getAllTasks().pipe(
                    map((response: ResponseInterface<[TaskInterface]>) => {
                        return taskActions.getAllTasksSuccess(response)
                    }),
                    catchError((errorResponse: ResponseErrorInterface) =>
                        of(
                            taskActions.addTaskFailure(errorResponse)
                        )
                    )
                )
            )
        );
    },
    { functional: true }
);

export const addTaskEffect = createEffect(
    (
        action$ = inject(Actions),
        TaskService = inject(taskService)
    ) => {
        return action$.pipe(
            ofType(taskActions.addTask),
            switchMap((request) =>
                TaskService.addTask(request).pipe(
                    map((response: ResponseInterface<[TaskInterface]>) => {
                        return taskActions.addTaskSuccess(response)
                    }),
                    catchError((errorResponse: ResponseErrorInterface) =>
                        of(
                            taskActions.addTaskFailure(errorResponse)
                        )
                    )
                )
            )
        );
    },
    { functional: true }
);

export const deleteTaskEffect = createEffect(
    (
        action$ = inject(Actions),
        TaskService = inject(taskService)
    ) => {
        return action$.pipe(
            ofType(taskActions.deleteTask),
            switchMap((request) =>
                TaskService.deleteTask(request.id).pipe(
                    map((response: ResponseInterface<[TaskInterface]>) => {
                        return taskActions.deleteTaskSuccess(response)
                    }),
                    catchError((errorResponse: ResponseErrorInterface) =>
                        of(
                            taskActions.deleteTaskFailure(errorResponse)
                        )
                    )
                )
            )
        );
    },
    { functional: true }
)

export const updateTaskEffect = createEffect(
    (
        action$ = inject(Actions),
        TaskService = inject(taskService)
    ) => {
        return action$.pipe(
            ofType(taskActions.updateTask),
            switchMap(({ id, task }) =>
                TaskService.updateTask(id, task).pipe(
                    map((response: ResponseInterface<TaskInterface>) => {
                        return taskActions.updateTaskSuccess(response)
                    }),
                    catchError((errorResponse: ResponseErrorInterface) =>
                        of(
                            taskActions.updateTaskFailure(errorResponse)
                        )
                    )
                )
            )
        );
    },
    { functional: true }
)

export const getSingleTaskEffect = createEffect(
    (
        action$ = inject(Actions),
        TaskService = inject(taskService)
    ) => {
        return action$.pipe(
            ofType(taskActions.getSingleTask),
            switchMap(({ id }) =>
                TaskService.getSingleTask(id).pipe(
                    map((response: ResponseInterface<TaskInterface>) => {
                        return taskActions.getSingleTaskSuccess(response)
                    }),
                    catchError((errorResponse: ResponseErrorInterface) =>
                        of(
                            taskActions.getSingleTaskFailure(errorResponse)
                        )
                    )
                )
            )
        );
    },
    { functional: true }
)

