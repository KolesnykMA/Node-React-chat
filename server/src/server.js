const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const dataBaseConnector = require('./data/db/connection.js');
const app = express();
app.use(cors());

dataBaseConnector
    .connect()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users/', require('./api/routes/userRoute'));
app.use('/api/chats/', require('./api/routes/chatRoute'));
app.use('/api/messages/', require('./api/routes/messageRoute'));
app.use('/api/auth/', require('./api/routes/authRoute'));


const { socketHandler } = require("./socket/index")

const socketServer = http.createServer(app);
const io = socketIo(socketServer);

socketHandler(io);


const port = 3001
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const socketPort = 8000;
socketServer.listen(socketPort, () => {
    console.log('listening on socket port ', socketPort);
});

