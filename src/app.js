
import express from 'express';
import { userRouter } from './routes/user.routes.js';
import bodyParser from 'body-parser';

const app = express();



app.use('/static', express.static('public'));

const printHello = (req, res) => {
    console.log(req.body);
    res.send("HEllo")
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', printHello)


// routes

app.use('/api/v1/users', userRouter)


export { app }