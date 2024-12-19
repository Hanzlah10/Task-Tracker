import { asyncHandler } from "../utlis/asyncHandler.js";
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { apiError } from "../utlis/apiError.js";
import { sqlConnection } from "../config/db.config.js";
config()


export const verifyJwt = asyncHandler(async (req, res, next) => {

    try {

        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        console.log(token);

        console.log(req.header("Authorization"));

        if (!token) {
            throw new apiError(400, 'Unauthorized request')
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

        const user = await sqlConnection('SELECT id,username,email,created_at,updated_at FROM `users` WHERE id = ?', [decodedToken?.id])

        if (!user) {
            throw new apiError(401, "Invalid  Token")
        }

        req.user = user[0]


        next()

    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Token")
    }

})



