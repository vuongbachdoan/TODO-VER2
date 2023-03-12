import axios from "axios";

const URL = "http://localhost:8000"
const END_POINT = {
    getTasks: 'api/v1/app/task',
    createTask: 'api/v1/app/task',
    deleteTask: 'api/v1/app/task'
}


export const TaskService = {
    getTasks: (workspaceId) => {
        // const header = `Bearer ${accessToken}`;

        return axios.get(
            `${URL}/${END_POINT.getTasks}/${workspaceId}`,
        )
    },
    createTask: (task) => {
        // const header = `Bearer ${accessToken}`;

        return axios.patch(
            `${URL}/${END_POINT.createTask}`,
            task,
            // {
            //     headers: {
            //         Authorization: header
            //     }
            // }
        )
    },
    deleteTask: (workspaceId, taskId) => {
        return axios.delete(
            `${URL}/${END_POINT.deleteTask}/${workspaceId}/${taskId}`
        );
    }
}
