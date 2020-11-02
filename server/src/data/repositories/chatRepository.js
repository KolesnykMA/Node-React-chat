const { UserModel, ChatModel } = require('../models/index.js');
const BaseRepository =  require('./baseRepository.js');

class ChatRepository extends BaseRepository{
    // Custom methods

    async getUserCreatedChats(chatCreatorId) {
        try {
            return await this.model.find({ "chatCreatorId": chatCreatorId });
        } catch (error) {
            throw new Error(`${this.model.collection.collectionName}_REPOSITORY_CREATE`)
        }

    }

    async getUserConnectedChatsByUserId(userId) {
        try {
            if (!await UserModel.findOne({ "_id":  userId })) {
                throw new Error('USER_NOT_EXISTS');
            }

            return await this.model.find({"connectedUsersId": {"$in": [userId]}});
        } catch (error) {
            throw new Error(`${this.model.collection.collectionName}_REPOSITORY_CREATE`)
        }

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
            throw new Error('USER_NOT_EXISTS');
        }

        //check password

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