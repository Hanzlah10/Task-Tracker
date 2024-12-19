import { apiError } from "../utlis/apiError.js"
import { sqlConnection } from "../config/db.config.js"
import { apiResponse } from "../utlis/apiResponse.js"
import { asyncHandler } from "../utlis/asyncHandler.js"
import jwt from 'jsonwebtoken'
import { config } from "dotenv"
config()

const options = {
    httpOnly: true,
    secure: true
}

const generateToken = async (id) => {
    return jwt.sign(
        {
            id
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}

const registerUser = asyncHandler(async (req, res) => {

    const { username, password, email } = req.body
    if (!username || !email || !password) {
        throw new apiError(400, "no data")
    }

    const existedUser = await sqlConnection("SELECT * FROM `users` WHERE `username` = ?", [username])
    console.log(existedUser);

    if (existedUser.length > 0) {
        throw new apiError(400, "User Already Exist !")
    }

    const insertResult = await sqlConnection("INSERT INTO users(email, username, password) VALUES (?,?,?) ", [email, username, password]);

    if (!insertResult) {
        throw new apiError(400, 'User not created!')
    }
    const createdUser = await sqlConnection("SELECT id,username,email,created_at,updated_at,refreshToken FROM `users` WHERE id = ?", [insertResult.insertId])

    return res
        .status(201)
        .json(
            new apiResponse(201, "User Created Successfully", createdUser[0])
        )

})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username) {
        throw new apiError(400, "username is required")
    }
    if (!password) {
        throw new apiError(400, 'password is required!')
    }

    const existedUser = await sqlConnection('SELECT * FROM `users` WHERE `username` = ?', [username])
    console.log(existedUser);

    if (!existedUser.length > 0) {
        throw new apiError(400, 'User not found')
    }
    if (existedUser[0].password !== password) {
        throw new apiError(400, 'password is incorrect')
    }

    const token = await generateToken(existedUser[0].id)

    const verifiedUser = await sqlConnection('UPDATE `users` SET `refreshToken` = ? WHERE id = ?', [token, existedUser[0].id])
    console.log(verifiedUser);

    if (existedUser[0] && existedUser[0].password) {
        delete existedUser[0].password;
    }

    existedUser[0].refreshToken = token

    return res
        .status(201)
        .cookie('token', token, options)
        .json(
            new apiResponse(200, "user loggedin successfully", existedUser[0])
        )
})

const logoutUser = asyncHandler(async (req, res) => {

    const id = req.body.id

    if (!id) {
        throw new apiError(400, "User ID is required to log out.");
    }

    try {
        sqlConnection('UPDATE `users` SET refreshToken = NULL WHERE `id` = ?', [id])
        res
            .status(200)
            .json(
                new apiResponse(201, "Logged Out successfully!", {})
            )
    }
    catch (error) {
        console.error(error);
        throw new apiError(500, "An error occurred while logging out.");
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {

    const userId = req.user.id
    try {
        const CurrentUser = await sqlConnection('SELECT id,username,email,created_at,updated_at FROM `users` WHERE id = ?', [userId])

        if (!CurrentUser) {
            throw new apiError(404, 'User not found !')
        }

        res
            .status(200)
            .json(
                new apiResponse(200, "Current User fetched Successfully", CurrentUser[0])
            )

    } catch (error) {
        console.log(error)
        throw new apiError(500, "An error occured while fetching current user")
    }
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}