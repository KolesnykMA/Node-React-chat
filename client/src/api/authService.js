const back_dev_url = "http://localhost:3001";
const axios = require("axios");
const { getFetchHeaders } = require("../helpers/webApiHelper");

const login = async (data) => {
  return new Promise((res, rej) => {
    axios
      .post(
        `${back_dev_url}/api/auth/login`,
        data
      )
      .then(response => {
        console.log(response, "back from login")
        res(response)
      })
      .catch(error => {
        rej(error)
      })
  })
};

const register = async (data) => {
  return new Promise((res, rej) => {
    axios
      .post(
        `${back_dev_url}/api/auth/register`,
        data
      )
      .then(response => {
        res(response)
      })
      .catch(error => {
        rej(error)
      })
  })
};

const getUserByToken = async () => {
  return new Promise((res, rej) => {
    axios
      .get(
        `${back_dev_url}/api/auth/user`,
        getFetchHeaders()
      )
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
  getUserByToken
}