const back_dev_url = "http://localhost:3001";
const axios = require("axios");
const queryString = require("query-string");

const getMessagesByChatId = async (chatId) => {
  return new Promise((res, rej) => {
    axios
      .get(`${back_dev_url}/api/messages/all?id=`+ chatId)
      .then(response => {
        const messages = response.data
        res(messages.map(message => {
          return {
            messageCreatorId: message.messageCreatorId,
            messageText: message.messageText
          }
        }))
      })
      .catch(error => {
        rej(error)
      })

  })
};

const sendMessage = async (messageData) => {
  return new Promise((res, rej) => {
    axios
      .post(`${back_dev_url}/api/messages`, messageData)
      .then(response => {
        res(response)
      })
      .catch(error => {
        rej(error)
      })

  })
};

module.exports = {
  getMessagesByChatId,
  sendMessage
}
