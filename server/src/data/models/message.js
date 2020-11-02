module.exports = (Schema, model, name) => {
    const MessageSchema = new Schema({
        messageCreator: {
            type: String,
            required: true,
        },
        chatId: {
            type: String,
            required: true
        },
        messageSentAt: {
            type: Array,
            required: false,
        }
    });

    return model(name, MessageSchema);
};