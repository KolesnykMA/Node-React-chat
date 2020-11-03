import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Input} from 'semantic-ui-react';
import openSocket from 'socket.io-client';
import { getConnectedChats, joinUserToChat } from "../../api/chatService"
import Chat from "../../components/Chat";
import { getMessagesByChatId } from "../../api/messageService";

const socket = openSocket('http://localhost:8000');

const StartPage = ({ user }) => {
  const [connectedChats, setConnectedChats] = useState([]);
  const [serverResponse, setServerResponse] = useState({});
  const [loading, setLoading] = useState(true);

  const [joinChatId, setJoinChatId] = useState("");
  const [joinChatPassword, setJoinChatPassword] = useState("");

  useEffect(() => {
    async function getInitialChats() {
      setLoading(true)
      const response = await getConnectedChats(user._id);
      const chats = response.data

      socket.emit("connectUserToChats", chats)

      for (const chat of chats) {
        chat.messages = await getMessagesByChatId(chat._id)
      }

      return chats
    }

    getInitialChats()
      .then(modifiedChats => {
        setConnectedChats(modifiedChats)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    socket.on("sendChatMessagesFromServer", response => {
      setServerResponse(response)
    })
  }, []);

  useEffect(() => {
    const { chatId, sendMessages } = serverResponse;

    setConnectedChats(
      connectedChats.map(chat =>
        chat._id === chatId
          ? {...chat, messages: sendMessages}
          : chat
      )
    )
  }, [serverResponse])

  const handleSendMessage = (data) => {
    socket.emit("message", (data))
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
        {connectedChats.map((chat, id) => {
          const currentChatMessages = chat.messages
          return <Chat user={ user } chatId={ chat._id } messages={currentChatMessages} onSendMessage={handleSendMessage}/>
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