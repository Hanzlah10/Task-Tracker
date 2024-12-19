
import express from 'express';
import { userRouter } from './routes/user.routes.js';
import bodyParser from 'body-parser';
import { taskRouter } from './routes/task.routes.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/static', express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)



export { app }

