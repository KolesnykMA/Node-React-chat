import React, {useEffect, useState} from "react";
import {Button, Input} from "semantic-ui-react";


const Chat = ({ user, chat, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    setChatMessages(chat.messages)
  }, [])

  const messageChanged = data => {
    setNewMessage(data);
  };

  const handleSendMessage = () => {
    const data = {
      chatId: chat._id,
      messageCreatorId: user._id,
      messageText: newMessage,
    }

    onSendMessage(data)
  }

  const renderChatMessages = chatMessages.map((message, id) => {
    let liStyle = user._id === message.messageCreatorId ? { color: "red" } : { color: "blue" }

    return <li key={"chat_" + chat._id + "_message_" + id} style={liStyle}>
      From {message.messageCreatorId}: {message.messageText}
    </li>
  })



  return (
    <div className="chat" style={{border: "1px solid black", margin: "20px"}}>
      <div className="chat-greeting">
        Hello { user.username } with id: { user._id }
        <br/>
        You are in chat with id: { chat._id }
      </div>

      <ul>
        { renderChatMessages }
      </ul>

      <Input
        fluid
        icon="at"
        iconPosition="left"
        placeholder="new message"
        onChange={ev => messageChanged(ev.target.value)}
      />
      <Button basic icon type="button" onClick={handleSendMessage}>
        Send message
      </Button>
    </div>

  );
};

export default Chat;