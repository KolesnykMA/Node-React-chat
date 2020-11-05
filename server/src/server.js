const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const dataBaseConnector = require('./data/db/connection.js');
const jwtValidation = require('./api/middlewares/jwtValidation.middleware');
const { socketHandler } = require("./socket/index");
const env = require('./env');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth/', require('./api/routes/authRoute'));
app.use('/api/users/', jwtValidation, require('./api/routes/userRoute'));
app.use('/api/chats/', jwtValidation, require('./api/routes/chatRoute'));
app.use('/api/messages/', jwtValidation, require('./api/routes/messageRoute'));

dataBaseConnector.connect()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const socketServer = http.createServer(app);
const io = socketIo(socketServer);
socketHandler(io);

app.listen(env.application.serverPort, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
  console.log(`Server listening on port ${env.application.serverPort}`);
});

socketServer.listen(env.application.socketPort, () => {
  console.log(`Socket listening on port ${env.application.socketPort}`);
});

