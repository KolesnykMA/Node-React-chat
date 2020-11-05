module.exports = (Schema, model, name) => {
  const MessageSchema = new Schema({
    messageCreatorId: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true
    },
    messageText: {
      type: String,
      required: true
    },
    messageSentAt: {
      type: Date,
      required: false,
    },
  });

  return model(name, MessageSchema);
};