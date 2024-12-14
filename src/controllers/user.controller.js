import { apiError } from "../utlis/apiError.js"
import { sqlConnection } from "../config/db.config.js"
import { apiResponse } from "../utlis/apiResponse.js"
import { asyncHandler } from "../utlis/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, userName, password, email } = req.body || req.header

    if ([fullName, userName, password, email].some((field) => !field || field.trim() === "")) {
        throw new apiError(400, "All Feilds are required !")
    }

    const existedUser = await sqlConnection("SELECT * FROM users WHERE email = ?", [email])
    if (existedUser.length > 0) {
        throw new apiError(400, "User Already Exist !")
    }

    const insertResult = await sqlConnection("INSERT INTO users(email, username, password) VALUES (?,?,?,?) ", [email, userName, password]);

    if (!insertResult) {
        throw new apiError(400, 'User not created!')
    }
    const createdUser = await sqlConnection("SELECT * FROM users WHERE id = ?", [insertResult.insertId])

    return res
        .status(201)
        .json(
            new apiResponse(201, "User Created Successfully", createdUser)
        )

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

})

const printHello = (req, res) => {
    res.send("HEllo")
}

export {
    registerUser,
    printHello
}