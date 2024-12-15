import { sqlConnection } from "../config/db.config.js";
import { apiError } from "../utlis/apiError.js";
import { apiResponse } from "../utlis/apiResponsejs";
import { asyncHandler } from "../utlis/asyncHandle.jsr";

// getAllTasks, getTaskById, createTask, updateTask, deleteTask 


const getAllTasks = asyncHandler(async (req, res) => {
    const id = req.user.id
    if (!id) {
        throw new apiError(400, "UserId not found!")
    }

    const tasks = await sqlConnection('SELECT * FROM `tasks` WHERE userId = ?', [id])

    if (!tasks) {
        throw new apiError(404, 'failed to fetch tasks')
    }
    console.log(tasks);

    return res
        .status(200)
        .json(
            new apiResponse(201, "All tasks fetched successfully", tasks)
        )
})

const getTaskById = asyncHandler(async (req, res) => {

    const taskId = req.params
    const userId = req.user.id
    if (!taskId) {
        throw new apiError('Task ID not found!')
    }

    const task = await sqlConnection('SELECT * FROM `tasks` WHERE `tasks.id` = ? AND `tasks.userId`= ?', [taskId, userId])

    if (!task) {
        throw new apiError(400, 'task not found')
    }

    console.log(task)
    return res
        .status(200)
        .json(
            new apiResponse(201, "task fetched successfully", task)
        )

})

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body

    console.log(title, description, status);
    //check if present or not -> remaining





})



export { getAllTasks, getTaskById }