const chatRepository = require("../../data/repositories/chatRepository.js");
const axios = require("axios");
const mediaServerUrl = 'http://localhost:4000/';

const startStream = (streamKey) => {
  try {
    return new Promise((res, rej) => {
      axios.post(mediaServerUrl + "start-stream", { streamKey })
        .then(result => {
          res(result);
        }).catch(error => {
        rej(error);
      })
    })
  } catch (error) {
    //TODO
  }
}

const finishStream = (streamKey) => {
  try {
    return new Promise((res, rej) => {
      axios.post(mediaServerUrl + "finish-stream", { streamKey })
        .then(result => {
          res(result);
        }).catch(error => {
        rej(error);
      })
    })
  } catch (error) {
    //TODO
  }
}

module.exports = {
  startChat: async (id) => {
    try {
      //TODO validate params
      const startStreamKey = await chatRepository.startChatByUserId(id);
      return await startStream(startStreamKey);
    } catch (error) {
      throw Error(error.message);
    }
  },

  finishChat: async (id) => {
    try {
      //TODO validate params
      const finishStreamKey = await chatRepository.finishChatByUserId(id);
      return await finishStream(finishStreamKey);
    } catch (error) {
      throw Error(error.message);
    }
  },

  getAllConnectedByUserId: async (id) => {
    try {
      //TODO validate params

      return await chatRepository.getUserConnectedChatsByUserId(id);
    } catch (error) {
      throw Error(error.message);
    }
  },

  joinChat: async (chatData) => {
    try {
      //TODO validate params

      return await chatRepository.joinChatByUserAndChatId(chatData);
    } catch (error) {
      throw Error(error.message);
    }
  },

  //base
  getAll: async (params) => {
    try {
      //TODO validate params

      return await chatRepository.getAllChats(params);
    } catch (error) {
      throw Error(error.message);
    }
  },

  getById: async (id) => {
    try {
      //TODO validate params

      return await chatRepository.getChatById(id);
    } catch (error) {
      throw Error(error.message);
    }
  },

  create: async (chatData) => {
    try {
      //TODO validate params

      const newChat = await chatRepository.createChat(chatData);

      return (newChat);
    } catch (error) {
      throw Error(error.message);
    }
  },

  update: async (chatData) => {
    try {
      //TODO validate params

      const { chatId, body } = chatData;

      //TODO if chat exists

      return await chatRepository.updateChatById(chatId, body);
    } catch (error) {
      throw Error(error.message);
    }
  },

  delete: async (chatId) => {
    try {
      //TODO validate params

      return await chatRepository.deleteChatById(chatId);
    } catch (error) {
      throw Error(error.message);
    }
  },
}
