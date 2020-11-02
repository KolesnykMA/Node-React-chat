import { emit } from "nodemon";
import { texts } from "../data.js"
import { SECONDS_TIMER_BEFORE_START_GAME,SECONDS_FOR_GAME } from "./config.js"

const rooms = ['ROOM_1', 'ROOM_2', 'ROOM_3'];
const roomsData = new Map();

const getCurrentRoomId = socket => Object.keys(socket.rooms).find(roomId => roomsData.has(roomId));
const socketData = new Map();

export default io => {
  io.on('connection', socket => {
    const username = socket.handshake.query.username;
    addNewSocketToSet(socket.id, username);

    socket.emit('UPDATE_ROOMS', rooms);

    socket.on('CREATE_ROOM', title => {
      if(rooms.includes(title)) {
        socket.emit('CREATE_ROOM_FALSE');
        return;
      }
      rooms.push(title);
      socket.emit('UPDATE_ROOMS', rooms);
    });

    socket.on('JOIN_ROOM', roomId => {
      socket.join(roomId,  () => {
        addNewUserToRoom(roomId, socket.id);
        let usersArray = roomsData.get(roomId);
        //console.log(usersArray)

        let socketInRoom = []
        usersArray.map(user => {
          socketInRoom.push(getByValue(socketData,user.username))
        })
        socketInRoom.map(socketId=>io.to(socketId).emit('JOIN_ROOM_DONE', {roomId},usersArray) )  
      });
    });

    socket.on('BACK_ROOMS', ()  => {
      const curRoomId = getCurrentRoomId(socket);
      // console.log(curRoomId)
      if (curRoomId) {
        socket.leave(curRoomId);
        deleteUserFromRoom(curRoomId, socket.id);

        let usersArray = roomsData.get(curRoomId);
        let socketInRoom = []
        usersArray.map(user => {
          socketInRoom.push( getByValue(socketData,user.username))
        })
        socketInRoom.map(socketId=>io.to(socketId).emit('UPDATE_ROOM', curRoomId,usersArray ));
        
        socket.emit('BACK_ROOMS_DONE',);
      }
    });

    socket.on('USER_READY', username => {
      let user = socketData.get(getByValue(socketData,username));
      user.isReady = true;

      const curRoomId = getCurrentRoomId(socket);
      let usersArray = roomsData.get(curRoomId);
      let socketInRoom = [];
      let startGame = true;
      usersArray.map(user => {
        socketInRoom.push( getByValue(socketData,user.username));
        if(!user.isReady) startGame = false;
      })
      socketInRoom.map(socketId=>io.to(socketId).emit('USER_READY_DONE', user));

      if(startGame) {
        socketInRoom.map(socketId=>io.to(socketId).emit('START_TIMER', SECONDS_TIMER_BEFORE_START_GAME));
      }
    })

    socket.on('USER_NOT_READY', username => {
      let user = socketData.get(getByValue(socketData,username));
      user.isReady = false;
      socket.emit('USER_NOT_READY_DONE', user)
      //console.log(user)
    })

    socket.on('START_GAME', () => {
      //console.log(texts[randomInt(0,texts.length-1)])

      const curRoomId = getCurrentRoomId(socket);
      let usersArray = roomsData.get(curRoomId);
      let socketInRoom = [];
      let startGame = true;
      usersArray.map(user => {
        socketInRoom.push( getByValue(socketData,user.username));
        if(!user.isReady) startGame = false;
      })
      socketInRoom.map(socketId=>io.to(socketId).emit('SHOW_DOC',  texts[0], SECONDS_FOR_GAME));
    })

    socket.on('END_GAME', ({username, userProgress}) => {
      let user = socketData.get(getByValue(socketData,username));
      user.progress = userProgress;

      const curRoomId = getCurrentRoomId(socket);
      let usersArray = roomsData.get(curRoomId);
      let socketInRoom = [];
      usersArray.map(user => {
        socketInRoom.push( getByValue(socketData,user.username));
      })
      socketInRoom.map(socketId=>io.to(socketId).emit('END_GAME_RESULTS', user));
    })

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      socketData.delete(`${socket.id}`)
    });
  });
};

function addNewSocketToSet(socketId, username) {
  let user = {username:username, isReady:false,progress:0,roomId:''}
  socketData.set(socketId,user);
}

function addNewUserToRoom(roomId, socketId) {
  let user = socketData.get(socketId);

  if(roomsData.get(roomId)) {
    let userArray = roomsData.get(roomId);

    if(containsObject(user, userArray)) return;
    userArray.push(user);
    user.roomId = roomId;
    roomsData.set(roomId, userArray)
  } else {
    let userArray = [];
    userArray.push(user);
    user.roomId = roomId;
    roomsData.set(roomId, userArray)
  }
}

function containsObject(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].username === obj.username) {
        return true;
    }
  }
  return false;
}

function deleteUserFromRoom(roomId, socketId) {
  let user = socketData.get(socketId);

  let roomUsers = roomsData.get(roomId);
  let index = roomUsers.indexOf(user);
  roomUsers.splice(index, 1);

  roomsData.set(roomId, roomUsers);
}

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value.username === searchValue)
      return key;
  }
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}