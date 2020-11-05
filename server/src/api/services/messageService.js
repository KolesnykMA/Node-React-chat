const MessageRepository = require("../../data/repositories/messageRepository");

module.exports = {
  // custom
  getAllByChatId: async (chatId) => {
    try {
      const messages = await MessageRepository.getAllMessagesByChatId(chatId);
      let returnMessages = [];

      for (const message of messages) {
        returnMessages.push({
          messageCreatorId: message.messageCreatorId,
          messageSentAt: message.messageSentAt,
          messageText: message.messageText
        })
      }

      return returnMessages;
    } catch (error) {
      throw Error(error.message);
      // return {
      //     error: error.message
      // };
    }
  },

  //base

  getAll: async () => {
    try {
      return await MessageRepository.getAllMessages();
    } catch (error) {
      throw Error(error.message);
      // return {
      //     error: error.message
      // };
    }
  },

  // getById: async (messageId) => {
  //     try {
  //         return await MessageRepository.getMessage(messageId);
  //     } catch (error) {
  //         return {
  //             error: error.message
  //         };
  //     }
  // },

  create: (messageData) => {
    try {
      const newChat = MessageRepository.createMessage(messageData);

      return (newChat);
    } catch (error) {
      throw Error(error.message);
      // return {
      //     error: error.message
      // };
    }
  },

  // update: async (messageData) => {
  //     try {
  //
  //
  //         // if chat exists
  //
  //         return await MessageRepository.updateMessageById(chatId, body);
  //     } catch (error) {
  //         return {
  //             error: error.message
  //         };
  //     }
  // },

  // delete: async (messageId) => {
  //     try {
  //         //
  //         return await MessageRepository.deleteMessageById(chatId)
  //     } catch (error) {
  //         // return {
  //         //     error: error.message
  //         // };
  //     }
  // },
}