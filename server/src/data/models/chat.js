module.exports = (Schema, model, name) => {
  const ChatSchema = new Schema({
    chatCreatorId: {
      type: String,
      required: true,
    },
    chatPassword: {
      type: String,
      required: true
    },
    connectedUsersId: {
      type: Array,
      required: false,
    },
    blackListUsersId: {
      type: Array,
      required: false,
    }
  });

  return model(name, ChatSchema);
};