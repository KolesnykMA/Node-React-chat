import React from 'react';
import { Grid, Header, Message } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import ChatCreateForm from "../../../components/ChatCreate/ChatCreateForm";
import { createChat } from "../../../api/chatService"

const ChatCreatePage = () => {
  const { location: { state: { user} } } = useHistory();

  return (
    <Grid textAlign="center" verticalAlign="middle" className="fill">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Chat create form
        </Header>
        <ChatCreateForm userId = { user._id } createNewChat = { createChat }/>
      </Grid.Column>
    </Grid>
  );
}


export default ChatCreatePage;