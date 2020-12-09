import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import { getActiveChats, getUserChat, startStream, finishStream } from "../../api/chatService"
import {Button} from "semantic-ui-react";

const StreamHomePage = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [userChat, setUserChat] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateLiveStreamInfo();
  }, []);

  const updateLiveStreamInfo = () => {
    getLiveStreams();
    getLiveUserStream();
  }

  const getLiveStreams = () => {
    setLoading(true);
    getActiveChats()
      .then(res => {
        let chats = res.data;
        setChats(chats);
      })
      .catch(error => {

      })
      .finally(() => {
        setLoading(false);
      })
  }

  const getLiveUserStream = () => {
    getUserChat()
      .then(res => {
        let userChat = res.data;
        setUserChat(userChat);
      })
      .catch(error => {

      })
      .finally(() => {
        setLoading(false)
      })
  }

  const startLiveStream = () => {
    startStream()
      .then(res => {
        updateLiveStreamInfo();
        alert(res);
      })
      .catch(error => {
        alert(error)
      })
  }

  const finishLiveStream = () => {
    finishStream()
      .then(res => {
        updateLiveStreamInfo();
        alert(res);
      })
      .catch(error => {
        alert(error)
      })

  }

  return (
    loading
      ?
      <div className="loading">
        loading
      </div>
      :
      <div className="container">
        <div className="user-stream" style={{border: "3px solid blue"}}>
          { userChat
            ?
              <div>
                You are live right now!
                Your stream key is { userChat.private_stream_key }
                <Button onClick={finishLiveStream}>
                  You can finish your stream right now!
                </Button>
              </div>
            :
              <div>
                You are offline right now!
                <Button onClick={startLiveStream}>
                  Start your stream right now
                </Button>
              </div>
          }
        </div>


        <div className="live-streams">
          <h4>Live Chats</h4>
          {chats.map((chat, id) => {
            return (
              <div className="stream__details" key={id} style={{border: "3px solid violet"}}>
                <span className="live-label">LIVE</span>
                <Link to={'/stream/'}>
                  <div className="stream-thumbnail">
                    <img src={'/thumbnails/' + '.png'}/>
                  </div>
                </Link>

                <span className="link-to-stream">
                  <Link to={{ pathname: "/stream-page/123213213", chatData: chat }}>
                    Go to stream
                  </Link>
                </span>
              </div>
            )
          })}
        </div>
      </div>
  )
}

const mapStateToProps = ({ profile }) => ({
  user: profile.user,
});

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(StreamHomePage);
