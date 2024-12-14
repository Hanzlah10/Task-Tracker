import { Router } from 'express';
import { registerUser, printHello } from '../controllers/user.controller.js';


const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/demo').get(printHello)

export { userRouter }  