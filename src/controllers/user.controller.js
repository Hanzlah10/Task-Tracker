import { apiError } from "../utlis/apiError"

const registerUser = async (req, res) => {

    const { fullName, userName, password, email } = req.body

    if ([fullName, userName, password, email].some((field) => field.trim() == "")) {
        throw new apiError(400, "All Feilds are required !")
    }

    // const existedUser = 
    // learn about schema then proceed with this





}


export {
    registerUser
}