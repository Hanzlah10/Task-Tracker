import { asyncHandler } from "../utlis/asyncHandler";

const addTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body

})