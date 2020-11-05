const { UserModel, ChatModel } = require('../models/index.js');
const BaseRepository =  require('./baseRepository.js');

class ChatRepository extends BaseRepository {
  // Custom methods

  async getUserConnectedChatsByUserId(userId) {
    try {
      await UserModel.findOne({ "_id":  userId });
    } catch (error) {
      throw Error('USER_NOT_EXISTS');
    }

    return await this.model.find({"connectedUsersId": {"$in": [userId]}})
  }

  async joinChatByUserAndChatId(chatData) {
    const { userId, chatId, password } = chatData;
    let chat = {};

    try {
      await UserModel.findOne({ "_id":  userId });
    } catch (error) {
      throw Error('USER_NOT_EXISTS');
    }

    try {
      chat = await this.model.findOne({ "_id":  chatId })
    } catch (error) {
      throw Error('CHAT_NOT_EXISTS');
    }

    if (chat.chatPassword !== password) {
      throw Error('CHAT_WRONG_PASSWORD');
    }

    const currentChatUsersId = chat.connectedUsersId

    if (currentChatUsersId.indexOf(userId) !== -1) {
      throw Error('USER_ALREADY_IN_CHAT');
    } else {
      currentChatUsersId.push(userId)
    }

    let newChatData = {
      chatCreatorId: chat.chatCreatorId,
      chatPassword: chat.chatPassword,
      connectedUsersId: currentChatUsersId,
      blackListUsersId: chat.blackListUsersId
    }

    return this.updateById(chatId, newChatData);
  }

  // Base repo

  getAllChats() {
    return this.getAll();
  }

  getChatById(chatId) {
    return this.getById(chatId);
  }

  async createChat(chat) {
    const { chatCreatorId } = chat;

    if (!await UserModel.findOne({ "_id":  chatCreatorId })) {
      throw Error('USER_NOT_EXISTS');
    }

    //check password

    chat.connectedUsersId = [chatCreatorId];

    return this.create(chat);
  }

  updateChatById(chatId, data) {
    return this.updateById(chatId, data);
  }

  deleteChatById(chatId) {
    return this.deleteById(chatId)
  }
}

module.exports = new ChatRepository(ChatModel);