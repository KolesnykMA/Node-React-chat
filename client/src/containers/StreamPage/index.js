import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';
import VideoPlayer from "../../components/VideoPlayer";
import Chat from "../../components/Chat";

const socket = openSocket('http://localhost:8000');


const StreamPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  // const [newMessage, setNewMessage] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chat, setChat] = useState({});

  const locationData = useLocation();

  useEffect(() => {
    setLoading(true);
    const { chatData } = locationData;
    setChat(chatData);
    setLoading(false);
    socket.emit("connectUserToChat", chatData._id);
  }, []);

  useEffect(() => {
    socket.on("sendChatMessageFromServer", newMessageFromServer => {
      setChatMessages(chatMessages => [...chatMessages, newMessageFromServer]);
    })
  }, []);

  // useEffect(() => {
  //   if (newMessage) {
  //     const oldMessages = chatMessages;
  //     oldMessages.push(newMessage);
  //     setChatMessages(oldMessages);
  //     console.log(chatMessages);
  //   }
  // }, [newMessage])

  const handleSendMessage = (messageData) => {
    socket.emit("sendChatMessageFromClient", (messageData))
  }

  return (
    loading
      ?
      <div className="loading">
        loading
      </div>
      :
      <div className="stream-page" style={{textAlign: "center"}}>
        <div className="user-stream-info" style={{paddingBottom: "20px"}}>
          user_id: {user._id}
          <br/>
          streamKey: {chat.private_stream_key }
        </div>

        <div className="stream-area" style={{display: "flex", flexDirection: "row"}}>
          <div className="live-stream-area" style={{width: "70%"}}>
            {/*<VideoPlayer streamKey={ chat.private_stream_key}/>*/}
          </div>
          <div className="live-chat-area" style={{width: "30%"}}>
            <Chat
              user = { user }
              chatId = { chat._id }
              currentChatMessages = { chatMessages }
              onSendMessage={ handleSendMessage }
            />
          </div>

        </div>
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
)(StreamPage);
