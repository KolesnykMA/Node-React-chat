import React, { useState } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

const ChatCreateForm = ({ userId, createNewChat }) => {
  const [password, setPassword] = useState('');

  const passwordChanged = data => {
    setPassword(data);
  };

  const handleCreateClick = async () => {
    if (!password) {
        return;
    }

    const chatData = {
      chatPassword: password,
      chatCreatorId: userId
    }

    createNewChat(chatData).then(() => {
      alert("New chat created")
    })
  };

  return (
    <Form name="loginForm" size="large" onSubmit={handleCreateClick}>
      Chat create form
      <Segment>
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="chat password"
          type="password"
          onChange={ev => passwordChanged(ev.target.value)}
        />
        <Button type="submit" color="teal" fluid size="large" primary>
          Create chat
        </Button>
      </Segment>
    </Form>
  );
};

// LoginForm.propTypes = {
//     login: PropTypes.func.isRequired
// };

export default ChatCreateForm;