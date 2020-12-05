import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import {connect} from 'react-redux';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');


const StreamPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState({});

  console.log(useParams(), useLocation(), useHistory(), useRouteMatch());

  // useEffect(() => {
  //   socket.emit("connectUserToChat", (userId));
  // }, []);

  // useEffect(() => {
  //   socket.on("getChatMessages", newSavedMessage => {
  //     setChatMessages(newSavedMessage)
  //   })
  // }, []);

  // useEffect(() => {
  //   const { chatId } = messageFromServer;
  //
  //   setChats(
  //     chats.map(chat =>
  //       chat._id === chatId
  //         ? {...chat, messages: chat.messages.push(messageFromServer)}
  //         : chat
  //     )
  //   )
  // }, [messageFromServer])

  const handleSendMessage = (messageData) => {
    socket.emit("sendChatMessage", (messageData))
  }

  return (
    loading
      ?
      <div className="loading">
        loading
      </div>
      :
      <div className="stream-page" style={{textAlign: "center"}}>
        Player and chat here
        {/*<VideoPlayer />*/}

        {/*<Chat*/}
        {/*  key={"chat_" + chat._id}*/}
        {/*  user={ user }*/}
        {/*  chat = { chat }*/}
        {/*  onSendMessage={ handleSendMessage }*/}
        {/*/>*/}
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
