import axios from "axios";

const URL = "http://localhost:8000"
const END_POINT = {
    signUp: 'api/v1/auth/sign-up',
    logIn: 'api/v1/auth/log-in',
}

export const AuthService = {
    logIn: (user) => {
        return axios.post(
            `${URL}/${END_POINT.logIn}`,
            user
        )
    },
    signUp: (user) => {
        return axios.post(
            `${URL}/${END_POINT.signUp}`,
            user
        )
    }
}