import React, {useEffect, useState} from "react";
import {Button, Input} from "semantic-ui-react";


const Chat = ({ user, chatId, currentChatMessages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const messageChanged = data => {
    setNewMessage(data);
  };

  const handleSendMessage = () => {
    const data = {
      chatId: chatId,
      messageCreatorId: user._id,
      messageText: newMessage,
    }

    onSendMessage(data);
  }


  return (
    <div className="chat" style={{border: "1px solid black", margin: "20px"}}>
      <div className="chat-user-info">
        Chat _id: { chatId }
      </div>

      <div className="chat-messages">
        <ul>
          {currentChatMessages.length > 0 && currentChatMessages.map((message, id) => {
            let liStyle = user._id === message.messageCreatorId ? { color: "black" } : { color: "grey" }
            const shortUserId = message.messageCreatorId.slice(0, 5);
            return <li key={"chat_" + chatId + "_message_" + id} style={liStyle}>
              {shortUserId}: {message.messageText}
            </li>
          }) }
        </ul>
      </div>

      <div className="chat-input">
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
    </div>
  );
};

export default Chat;