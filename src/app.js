
import express from 'express';
import { userRouter } from './routes/user.routes';

const app = express();



app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World! how are you<h1>')
})


// routes

app.use('/api/v1/users', userRouter)


export { app }