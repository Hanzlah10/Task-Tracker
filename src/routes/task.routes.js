import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
// const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
//import statement pending
import { createTask, getAllTasks, getTaskById } from '../controllers/task.controller.js';
const taskRouter = Router();

taskRouter.route('/').get(verifyJwt, getAllTasks)
taskRouter.route('/:id').get(verifyJwt, getTaskById)
taskRouter.route('/create').post(verifyJwt, createTask)
// taskRouter.route('/tasks/update/:id').post(verifyJwt, updateTask)
// taskRouter.route('/tasks/delete/:id').post(verifyJwt, deleteTask)


export { taskRouter }
