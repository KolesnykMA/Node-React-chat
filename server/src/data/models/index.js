const mongoose = require('mongoose');
const UserSchema = require('./user.js');
const ChatSchema = require('./chat');
const MessageSchema = require('./message');

const { Schema, model } = mongoose;

const UserModel = UserSchema(Schema, model, "User");
const ChatModel = ChatSchema(Schema, model, "Chat");
const MessageModel = MessageSchema(Schema, model, "Message");

module.exports = {
    UserModel,
    ChatModel,
    MessageModel
};