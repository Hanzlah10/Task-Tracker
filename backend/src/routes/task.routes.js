import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';
const taskRouter = Router();

taskRouter.route('/').get(verifyJwt, getAllTasks)
taskRouter.route('/:id').get(verifyJwt, getTaskById)
taskRouter.route('/create').post(verifyJwt, createTask)
taskRouter.route('/update/:id').patch(verifyJwt, updateTask)
taskRouter.route('/delete/:id').delete(verifyJwt, deleteTask)


export { taskRouter }
