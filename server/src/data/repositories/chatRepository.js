const { UserModel, ChatModel } = require('../models/index.js');
const BaseRepository =  require('./baseRepository.js');


class ChatRepository extends BaseRepository {
  /*
    verify started stream
   */
  async verifyStartedChatByUserId(userId) {
    try {
      return await ChatModel.findOne({ "chatCreatorId":  userId, "active": true });
    } catch (error) {
      throw Error('__');
    }
  }
  /*
    start stream
   */
  async startChatByUserId(userId) {
    try {
      let newRandomStreamKey = Math.random().toString(36).substring(7);
      const userChat = await ChatModel.findOne({ "chatCreatorId": userId });

      if (!userChat) {
        const newUser = await this.createChat({ chatCreatorId: userId });
      }

      await ChatModel.updateOne({ "chatCreatorId": userId },
          { $set: { "active": true, "private_stream_key": newRandomStreamKey } });

      return newRandomStreamKey;
    } catch (error) {
      throw Error(error);
    }
  }

  /*
    finish stream
   */
  async finishChatByUserId(userId) {
    try {
      const currentChat = await ChatModel.findOne({ "chatCreatorId": userId });
      const private_stream_key = currentChat.private_stream_key;

      await ChatModel.updateOne({ "chatCreatorId": userId },
        { $set: { "active": false, "private_stream_key": "" } })

      return private_stream_key;
    } catch (error) {
      throw Error('__');
    }
  }

  async getUserConnectedChatsByUserId(userId) {
    try {
      await UserModel.findOne({ "_id":  userId });
    } catch (error) {
      throw Error('USER_NOT_EXISTS');
    }

    return await this.model.find({"connectedUsersId": {"$in": [userId]}})
  }

  async joinChatByUserAndChatId(chatData) {
    const { userId, chatId } = chatData;
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

    // if (chat.chatPassword !== password) {
    //   throw Error('CHAT_WRONG_PASSWORD');
    // }

    const currentChatUsersId = chat.connectedUsersId

    if (currentChatUsersId.indexOf(userId) !== -1) {
      throw Error('USER_ALREADY_IN_CHAT');
    } else {
      currentChatUsersId.push(userId)
    }

    let newChatData = {
      chatCreatorId: chat.chatCreatorId,
      connectedUsersId: currentChatUsersId,
      blackListUsersId: chat.blackListUsersId
    }

    return this.updateById(chatId, newChatData);
  }

  // Base repo

  getAllChats(params) {
    return this.getAll(params);
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
    chat.blackListUsersId = [];
    chat.active = false;
    chat.private_stream_key = "default";

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
