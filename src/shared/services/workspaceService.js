import axios from "axios";

const URL = "http://localhost:8000"
const END_POINT = {
    getWorkspaces: 'api/v1/app/workspaces',
    createWorkspace: 'api/v1/app/workspaces'
}

export const WorkspaceService = {
    getWorkspaces: (userId) => {
        console.log(`${userId}: userid`)
        // const header = `Bearer ${accessToken}`;

        return axios.get(
            `${URL}/${END_POINT.getWorkspaces}/${userId}`,
            // {
            //     headers: {
            //         Authorization: header
            //     },
            // }
        )
    },
    createWorkspace: (workspace) => {
        return axios.post(
            `${URL}/${END_POINT.createWorkspace}`,
            workspace
        )
    }
}