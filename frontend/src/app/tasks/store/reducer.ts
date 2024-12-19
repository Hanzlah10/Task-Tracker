import { createFeature, createReducer, on } from "@ngrx/store";
import { taskStateInterface } from "../types/taskState.interface";
import { taskActions } from "./actions";

const initialState: taskStateInterface = {
    tasks: [],
    error: null,
    message: null,
    selectedTask: null
}

const taskFeature = createFeature({
    name: 'task',
    reducer: createReducer(
        initialState,
        on(taskActions.getAllTasksSuccess, (state, action) => ({
            ...state,
            tasks: action.data,
            message: action.message
        })),
        on(taskActions.getAllTasksFailure, (state, action) => ({
            ...state,
            error: action,
            message: action.message
        })),
        on(taskActions.getSingleTaskSuccess, (state, action) => ({
            ...state,
            selectedTask: action.data,
            message: action.message
        })),
        on(taskActions.getSingleTaskFailure, (state, action) => ({
            ...state,
            error: action.errors,
            message: action.message
        })),
        on(taskActions.addTaskSuccess, (state, action) => ({
            ...state,
            tasks: action.data,
            message: action.message
        })),
        on(taskActions.addTaskFailure, (state, action) => ({
            ...state,
            error: action.errors,
            message: action.message
        })),
        on(taskActions.updateTaskSuccess, (state, action) => ({
            ...state,
            tasks: state.tasks.map(task =>
                task.id === action.data.id ? action.data : task
            ),
            message: action.message
        })),
        on(taskActions.updateTaskFailure, (state, action) => ({
            ...state,
            error: action.errors,
            message: action.message
        })),
        on(taskActions.deleteTaskSuccess, (state, action) => ({
            ...state,
            tasks: action.data,
            message: action.message
        })),
        on(taskActions.deleteTaskFailure, (state, action) => ({
            ...state,
            error: action.errors,
            message: action.message
        }))
    )
})

export const {
    name: taskFeatureKey,
    reducer: taskReducer,
    selectError,
    selectMessage,
    selectSelectedTask,
    selectTasks
} = taskFeature