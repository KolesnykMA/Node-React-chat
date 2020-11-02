const back_dev_url = "http://localhost:3001";
const axios = require("axios");
const queryString = require("query-string");

const login = (data) => {
    return new Promise((res, rej) => {
        axios
            .post(`${back_dev_url}/api/auth/login`, data)
            .then(response => {
                res(response)
            })
            .catch(error => {
                rej(error)
            })

    })
};

const register = (data) => {
    return new Promise((res, rej) => {
        axios
            .post(`${back_dev_url}/api/auth/register`, data)
            .then(response => {
                res(response)
            })
            .catch(error => {
                rej(error)
            })

    })
};

const getCurrentUser = async (userId) => {
    return new Promise((res, rej) => {
        axios
            .get(`${back_dev_url}/api/users/` + userId)
            .then(response => {
                res(response)
            })
            .catch(error => {
                rej(error)
            })

    })
};

module.exports = {
    login,
    register,
    getCurrentUser
}