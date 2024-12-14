
import express from 'express';
import { userRouter } from './routes/user.routes.js';

const app = express();



app.use('/static', express.static('public'));

const printHello = (req, res) => {
    res.send("HEllo")
}
app.get('/', printHello)


// routes

app.get('/api/v1/users', userRouter)


export { app }