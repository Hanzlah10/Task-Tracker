import { sqlConnection } from "../config/db.config.js";
import { apiError } from "../utlis/apiError.js";
import { apiResponse } from "../utlis/apiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

//  updateTask, deleteTask 


const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.user.id
    if (!userId) {
        throw new apiError(400, "UserId not found!")
    }

    const tasks = await sqlConnection('SELECT * FROM `tasks` WHERE `userId` = ?', [userId])

    if (!tasks) {
        throw new apiError(404, 'failed to fetch tasks')
    }

    return res
        .status(200)
        .json(
            new apiResponse(201, "All tasks fetched successfully", tasks)
        )
})

const getTaskById = asyncHandler(async (req, res) => {

    const taskId = req.params.id
    const userId = req.user.id
    if (!taskId) {
        throw new apiError('Task ID not found!')
    }


    const task = await sqlConnection('SELECT * FROM `tasks` WHERE `id` = ? AND `userId`= ?', [taskId, userId])

    if (!task) {
        throw new apiError(400, 'task not found')
    }

    return res
        .status(200)
        .json(
            new apiResponse(201, "task fetched successfully", task)
        )

})

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user.id;
    console.log(req.body);

    console.log(userId);

    if (!title || !description || !status) {
        throw new apiError(400, "All fields (title, description, status) are required");
    }

    try {
        const query = 'INSERT INTO `tasks` (title, description, status, userId) VALUES (?, ?, ?, ?)';
        const createdTaskResult = await sqlConnection(query, [title, description, status, userId]);

        const createdTask = await sqlConnection('SELECT * FROM `tasks` WHERE id = ?', [createdTaskResult.insertId])
        return res
            .status(201)
            .json(
                new apiResponse(201, "Task created successfully", createdTask)
            );
    } catch (error) {
        throw new apiError(400, error?.message || "Failed to create task");
    }
});


export { getAllTasks, getTaskById, createTask }