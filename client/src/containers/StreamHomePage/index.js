import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
// import Chat from "../../components/Chat";

const StreamHomePage = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeChats = getActiveChats();
    console.log(activeChats);
  }, []);

  function getActiveChats() {
    axios.get('http://127.0.0.1:' + '3001' + '/api/chats?active=true')
      .then(res => {
        let chats = res.data;
        setChats(chats);
      })
      .finally(() => setLoading(false))
  }

  return (
    loading
      ?
      <div className="loading">
        loading
      </div>
      :
      <div className="container mt-5">
        <h4>Live Chats</h4>
        <hr className="my-4"/>
        <div className="streams row">
          {chats.map((chat, id) => {
            return (
              <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={id}>
                <span className="live-label">LIVE</span>
                <Link to={'/stream/'}>
                  <div className="stream-thumbnail">
                    <img src={'/thumbnails/' + '.png'}/>
                  </div>
                </Link>

                <span className="username">
                  <Link to={'/stream/'}>
                    chat name
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

// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(StreamHomePage);
