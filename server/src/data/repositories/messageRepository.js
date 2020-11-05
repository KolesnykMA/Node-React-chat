const { MessageModel, ChatModel } = require('../models/index.js');
const BaseRepository =  require('./baseRepository.js');

class MessageRepository extends BaseRepository{
  // Custom methods
  async getAllMessagesByChatId(chatId) {
    return await this.model.find({ "chatId": chatId });
  }

  // Base repo
  getAllMessages() {
    return this.getAll();
  }

  getChatById(chatId) {
      return this.getById(chatId);
  }

  async createMessage(messageData) {
    const { chatId } = messageData;

    if (!await ChatModel.findOne({ "_id":  chatId })) {
      throw Error('CHAT_NOT_EXISTS');
    }

    messageData.messageSentAt = Date.now();

    return this.create(messageData);
  }

  updateChatById(chatId, data) {
      return this.updateById(chatId, data);
  }

  deleteChatById(chatId) {
      return this.deleteById(chatId);
  }
}

module.exports = new MessageRepository(MessageModel);