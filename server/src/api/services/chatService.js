const ChatRepository = require("../../data/repositories/chatRepository.js");

module.exports = {
  // custom

  getAllConnectedByUserId: async (id) => {
    try {
      return await ChatRepository.getUserConnectedChatsByUserId(id);
    } catch (error) {
      throw Error(error.message);
    }
  },

  joinChat: async (chatData) => {
    try {
      return await ChatRepository.joinChatByUserAndChatId(chatData);
    } catch (error) {
      throw Error(error.message);
    }
  },

  //base

  getAll: async () => {
    try {
      return await ChatRepository.getAllChats();
    } catch (error) {
      throw Error(error.message);
    }
  },

  getById: async (id) => {
    try {
      return await ChatRepository.getChatById(id);
    } catch (error) {
      throw Error(error.message);
    }
  },

  create: async (chatData) => {
    try {
      const newChat = await ChatRepository.createChat(chatData);

      return (newChat);
    } catch (error) {
      throw Error(error.message);
    }
  },

  update: async (chatData) => {
    try {
      const { chatId, body } = chatData;

      // if chat exists

      return await ChatRepository.updateChatById(chatId, body);
    } catch (error) {
      throw Error(error.message);
    }
  },

  delete: async (chatId) => {
    try {
      return await ChatRepository.deleteChatById(chatId);
    } catch (error) {
      throw Error(error.message);
    }
  },
}