const messageService = require("../api/services/messageService");
const chatService = require("../api/services/chatService");

const chatsData = new Map();

const chat = io => {
  io.on('connection', socket => {
    const clientSocketId = socket.id;

    socket.on("connectUserToChat", async (chatId) => {
      try {
        const chatIdString = (chatId).toString()
        connectUserSocketToChat(chatIdString, clientSocketId);
        // const messages = await messageService.getAllByChatId(chatIdString);
        // io.to(clientSocketId).emit('sendChatMessageFromServer', messages
      } catch (error) {
        //socket.emit("getChatMessagesError", { error: error, message: "on.connectUserToChat" });
      }
    })

    socket.on('sendChatMessageFromClient', (messageData) => {
      const { chatId } = messageData;

      messageService.create(messageData)
        .then(() => {
          const chatUserSockets = chatsData.get(chatId);

          console.log(chatUserSockets)

          chatUserSockets.forEach(socket => {
            io.to(socket).emit('sendChatMessageFromServer', messageData)
          })
        })
        .catch(error => {
          //socket.emit("sendChatMessagesFromServerError", { error: error, message: "on.sendMessageFromClient" });
        })
    })
  });
}

function connectUserSocketToChat(chatId, socketId) {
  let chatUserSockets = chatsData.get(chatId);

  if (chatUserSockets) {
    if(chatUserSockets.indexOf(socketId) !== -1) {
      return
    }
    chatUserSockets.push(socketId);
    chatsData.set(chatId, chatUserSockets);
  } else {
    let userSockets = []
    userSockets.push(socketId)
    chatsData.set(chatId, userSockets);
  }
}

module.exports = {
  chat
}