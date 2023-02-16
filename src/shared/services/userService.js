import axios from "axios";

const URL = "http://localhost:8000"
const END_POINT = {
    singUp: '/api/v1/auth/sign-up',
    logIn: '/api/v1/auth/log-in',
}

export const UserService = {
    getAll: () => {
        axios.get(`${URL}/${END_POINT.user}`)
        .then((res) => console.log(res));
    },
    create: (user) => {
        return axios.post(
            `${URL}/${END_POINT.user}`, 
            user
        );
    }
}