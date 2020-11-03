const messageService = require("../api/services/messageService");
const mainRoomId = "5fa000af5715e297e9f38b23"

const chatsData = new Map();
const socketData = new Map();

const chat = io =>
{
  io.on('connection', socket => {
    const userSocketId = socket.id

    addNewSocketToSet(userSocketId);

    socket.on("connectUserToChats", (chats) => {
      chats.forEach(chat => {
        connectUserToChat(chat._id, userSocketId)
      })
    })

    socket.on('message', (messageData) => {
      const {chatId, messageCreatorId, messageText} = messageData;

      messageService.create({messageCreatorId, chatId, messageText})
        .then(() => {
          messageService.getAllByChatId(chatId)
            .then(messages => {
              const sendMessages = messages.map(message => {
                return {
                  messageCreatorId: message.messageCreatorId,
                  messageText: message.messageText
                }
              })

              const chatUsers = chatsData.get(chatId)
              chatUsers.forEach(user => {
                io.to(user.socketId).emit('sendChatMessagesFromServer', { chatId, sendMessages })
              })
            })
        })
        .catch(error => {
          socket.emit("sendChatMessagesFromServerError", { error:true });
        })
    })

  });
}

function addNewSocketToSet(socketId) {
  let user = { socketId, chatIds: [mainRoomId] }
  socketData.set(socketId, user);
}

function connectUserToChat(chatId, socketId) {
  let user = socketData.get(socketId);

  if(chatsData.get(chatId)) {
    let userArray = chatsData.get(chatId);

    if(userArray.indexOf(user) !== -1) {
      return
    }

    userArray.push(user);
    user.chatIds.push(chatId);
    chatsData.set(chatId, userArray)
  } else {

    let userArray = [];
    userArray.push(user);
    user.chatIds.push(chatId);
    chatsData.set(chatId, userArray)
  }
}

module.exports = {
  chat
}