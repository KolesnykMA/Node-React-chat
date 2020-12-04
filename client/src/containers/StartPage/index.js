import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Input} from 'semantic-ui-react';
import openSocket from 'socket.io-client';
import { getConnectedChats, joinUserToChat } from "../../api/chatService"
import Chat from "../../components/Chat";
import { getMessagesByChatId } from "../../api/messageService";
import VideoPlayer from "../../components/VideoPlayer";

const socket = openSocket('http://localhost:8000');

const StartPage = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageFromServer, setMessageFromServer] = useState({});

  const [joinChatId, setJoinChatId] = useState("");
  const [joinChatPassword, setJoinChatPassword] = useState("");

  useEffect(() => {
    const userId = user._id;
    socket.emit("connectUserToChats", (userId));
  }, []);

  useEffect(() => {
    setLoading(true);
    socket.on("sendChatsWithMessagesFromServer", (userChats) => {
      setChats(userChats);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    socket.on("sendChatMessageFromServer", newSavedMessage => {
      setMessageFromServer(newSavedMessage)
    })
  }, []);

  useEffect(() => {
    const { chatId } = messageFromServer;

    setChats(
      chats.map(chat =>
        chat._id === chatId
          ? {...chat, messages: chat.messages.push(messageFromServer)}
          : chat
      )
    )
  }, [messageFromServer])

  const handleSendMessage = (messageData) => {
    socket.emit("sendMessageFromClient", (messageData))
  }

  const handleJoinChat = () => {
    const chatData = {
      userId: user._id,
      chatId: joinChatId,
      password: joinChatPassword
    }

    joinUserToChat(chatData)
      .then(response => {
        alert("You have joined chat")
      })
      .catch(error => {
        alert(error)
      })
  }

  const joinChatIdChanged = data => {
    setJoinChatId(data);
  };

  const joinChatPasswordChanged = data => {
    setJoinChatPassword(data);
  }

  return (
    loading
      ?
      <div className="loading">
        loading
      </div>
      :
      <div className="start-page" style={{textAlign: "center"}}>
        <VideoPlayer/>

        {chats.map((chat, id) => {
          return <Chat
            key={"chat_" + chat._id}
            user={ user }
            chat = { chat }
            onSendMessage={ handleSendMessage }/>
        })}

        <Link to={{
          pathname: '/create-chat',
          state: {
            user
          }
        }}>
          Create chat
        </Link>

        <Input
          placeholder="chat id"
          onChange={ev => joinChatIdChanged(ev.target.value)}
        />
        <Input
          placeholder="chat password"
          onChange={ev => joinChatPasswordChanged(ev.target.value)}
        />
        <Button basic icon type="button" onClick={handleJoinChat}>
          Join chat
        </Button>
      </div>
  );
};

const mapStateToProps = ({ profile }) => ({
    user: profile.user,
});

// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(StartPage);
