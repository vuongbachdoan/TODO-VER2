import axios from "axios";

const URL = "http://localhost:8000"
const END_POINT = {
    getAll: 'api/v1/account',
    getOne: 'api/v1/account'
}


export const UserService = {
    getOne: (accessToken, _id) => {
        const header = `Bearer ${accessToken}`;

        return axios.get(
            `${URL}/${END_POINT.getOne}`,
            {
                headers: {
                    Authorization: header
                },
                params: {
                    id: _id
                }
            }
        )
    },
    getAll: (accessToken) => {
        const header = `Bearer ${accessToken}`;

        return axios.get(
            `${URL}/${END_POINT.getAll}`,
            {
                headers: {
                    Authorization: header
                }
            }
        )
    },
    create: (user) => {
        return axios.post(
            `${URL}/${END_POINT.auth.singUp}`,
            user
        );
    }
}
