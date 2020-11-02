
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Input } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
// import * as imageService from 'src/services/imageService';
// import ExpandedPost from 'src/containers/ExpandedPost';
// import Post from 'src/components/Post';
// import AddPost from 'src/components/AddPost';
// import SharedPostLink from 'src/components/SharedPostLink';
// import { Checkbox, Loader } from 'semantic-ui-react';
// import InfiniteScroll from 'react-infinite-scroller';
// import { loadPosts, loadMorePosts, likePost, toggleExpandedPost, addPost } from './actions';


// const postsFilter = {
//   userId: undefined,
//   from: 0,
//   count: 10
// };

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');


// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }
const currentUser = Math.random();
const chatRoomName = "Main"

const StartPage = ({
                      //  userId,
                       // loadPosts: load,
                       // loadMorePosts: loadMore,
                       // posts = [],
                       // expandedPost,
                       // hasMorePosts,
                       // addPost: createPost,
                       // likePost: like,
                       // toggleExpandedPost: toggle               
}) => {
    const [message, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on("sendChatMessagesFromServer", messages => {
          setMessages(messages)
        })
      }, []);

    const messageChanged = data => {
      setNewMessage(data);
    };

    const handleSendMessage = () => {
      const newMessage = {
        owner: currentUser,
        message
      }

      const data = {
        chatRoomName,
        newMessage
      }

      socket.emit("message", (data))
    }

    const chatMessages = messages.map((message) => <li>From {message.owner}: {message.message}</li>);

    return (
      <>
        <ul>
          { chatMessages }
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
      </>
        
    );
};

StartPage.propTypes = {
    // posts: PropTypes.arrayOf(PropTypes.object),
    // hasMorePosts: PropTypes.bool,
    // expandedPost: PropTypes.objectOf(PropTypes.any),
    // userId: PropTypes.string,
    // loadPosts: PropTypes.func.isRequired,
    // loadMorePosts: PropTypes.func.isRequired,
    // likePost: PropTypes.func.isRequired,
    // toggleExpandedPost: PropTypes.func.isRequired,
    // addPost: PropTypes.func.isRequired
};

StartPage.defaultProps = {
    // posts: [],
    // hasMorePosts: true,
    // expandedPost: undefined,
    // userId: undefined
};

const mapStateToProps = rootState => ({
    // posts: rootState.posts.posts,
    // hasMorePosts: rootState.posts.hasMorePosts,
    // expandedPost: rootState.posts.expandedPost,
    // userId: rootState.profile.user.id
});

const actions = {
    // loadPosts,
    // loadMorePosts,
    // likePost,
    // toggleExpandedPost,
    // addPost
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);