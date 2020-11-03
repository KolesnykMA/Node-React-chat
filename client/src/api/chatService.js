const back_dev_url = "http://localhost:3001";
const axios = require("axios");
const queryString = require("query-string");

const createChat = async (chatData) => {
  return new Promise((res, rej) => {
    axios
      .post(`${back_dev_url}/api/chats`, chatData)
      .then(response => {
        res(response)
      })
      .catch(error => {
        rej(error)
      })

  })
};

const getConnectedChats = async (userId) => {
  return new Promise((res, rej) => {
    axios
      .get(`${back_dev_url}/api/chats/connected/?id=${userId}`)
      .then(response => {
        res(response)
      })
      .catch(error => {
        rej(error)
      })

  })
};

const joinUserToChat = async (chatData) => {
  return new Promise((res, rej) => {
    axios
      .post(`${back_dev_url}/api/chats/join`, chatData)
      .then(response => {
        res(response)
      })
      .catch(error => {
        rej(error)
      })

  })
};

module.exports = {
  createChat,
  getConnectedChats,
  joinUserToChat
}
