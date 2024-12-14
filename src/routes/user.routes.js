import { Router } from 'express'
import { registerUser, printHello } from '../controllers/user.controller.js'


const userRouter = Router()

userRouter.route('/register', registerUser)
userRouter.route('/demo', printHello)

export { userRouter }  