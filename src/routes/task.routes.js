import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware';
// const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
//import statement pending

const taskRouter = Router();

taskRouter.route('/tasks').get(verifyJwt, getAllTasks)
taskRouter.route('/tasks/:id').get(verifyJwt, getTaskById)
taskRouter.route('/tasks/create').post(verifyJwt, createTask)
taskRouter.route('/tasks/update/:id').post(verifyJwt, updateTask)
taskRouter.route('/tasks/delete/:id').post(verifyJwt, deleteTask)


export { taskRouter }
