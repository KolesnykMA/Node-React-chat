const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const env = require('./env');
const routes = require("./api/routes");
const dataBaseConnector = require('./data/db/connection.js');
const { socketHandler } = require("./socket/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

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

