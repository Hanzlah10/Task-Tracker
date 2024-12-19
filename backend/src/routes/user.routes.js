import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/currentUser').post(verifyJwt, getCurrentUser)
userRouter.route('/logout').post(verifyJwt, logoutUser)

export { userRouter }


