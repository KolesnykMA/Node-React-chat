const messageService = require("../api/services/messageService");
const chatService = require("../api/services/chatService");

const chatsData = new Map();
const socketData = new Set();

const chat = io => {
  io.on('connection', socket => {
    const clientSocketId = socket.id;
    addNewSocketToSet(clientSocketId);

    socket.on("connectUserToChats", async (userId) => {
      try {
        let userChats = await chatService.getAllConnectedByUserId(userId);
        let modifiedChats = [];

        for (const chat of userChats) {
          const chatId = (chat._id).toString()
          connectUserSocketToChat(chatId, clientSocketId);

          const messages = await messageService.getAllByChatId(chat._id);
          modifiedChats.push({
            chatCreatorId: chat.chatCreatorId,
            messages: messages,
            _id: chat._id
          })
        }

        io.to(clientSocketId).emit('sendChatsWithMessagesFromServer', modifiedChats)
      } catch (error) {
        socket.emit("sendChatMessagesFromServerError", { error: true, message: "on.connectUserToChats" });
      }
    })

    socket.on('sendMessageFromClient', (messageData) => {
      const { chatId } = messageData;

      messageService.create(messageData)
        .then(() => {
          const chatUserSockets = chatsData.get(chatId);

          chatUserSockets.forEach(socket => {
            io.to(socket).emit('sendChatMessageFromServer', messageData)
          })
        })
        .catch(error => {
          socket.emit("sendChatMessagesFromServerError", { error: true, message: "on.sendMessageFromClient" });
        })
    })
  });
}

function addNewSocketToSet(socketId) {
  socketData.add(socketId);
}

function connectUserSocketToChat(chatId, socketId) {
  let chatUserSockets = chatsData.get(chatId);

  if (chatUserSockets) {
    let userSockets = chatsData.get(chatId);

    if(userSockets.indexOf(socketId) !== -1) {
      return
    }

    userSockets.push(socketId);
    chatsData.set(chatId, userSockets);
  } else {
    let userSockets = []
    userSockets.push(socketId)
    chatsData.set(chatId, userSockets);
  }
}

module.exports = {
  chat
}