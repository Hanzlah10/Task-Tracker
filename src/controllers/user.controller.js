import { apiError } from "../utlis/apiError"
import { sqlConnection } from "../config/db.config"

const registerUser = async (req, res) => {

    const { fullName, userName, password, email } = req.body

    if ([fullName, userName, password, email].some((field) => field.trim() == "")) {
        throw new apiError(400, "All Feilds are required !")
    }

    // const existedUser = 
    const existedUser = sqlConnection("SELECT * FROM users WHERE email = ?", [email])
    if (existedUser.length > 0) {
        throw new apiError(400, "User Already Exist !")
    }





}


export {
    registerUser
}