const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const dataBaseConnector = require('./data/db/connection.js');
const jwtValidation = require('./api/middlewares/jwtValidation.middleware');
const { socketHandler } = require("./socket/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dataBaseConnector
  .connect()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', (req, res) => {
  res.send('Open test route!');
})

app.use('/api/auth/', require('./api/routes/authRoute'));
app.use('/api/users/', jwtValidation, require('./api/routes/userRoute'));
app.use('/api/chats/', jwtValidation, require('./api/routes/chatRoute'));
app.use('/api/messages/', jwtValidation, require('./api/routes/messageRoute'));

const socketServer = http.createServer(app);
const io = socketIo(socketServer);
socketHandler(io);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
  console.log(`Server listening on port ${port}`);
});

const socketPort = 8000;
socketServer.listen(socketPort, () => {
  console.log(`Socket listening on port ${socketPort}`);
});

