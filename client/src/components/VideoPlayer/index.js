import React from 'react';
import videojs from 'video.js'
import axios from 'axios';
// import config from '../../server/config/default';


export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: false,
      videoJsOptions: null,
      streamKey: props.streamKey
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
        stream: true,
        videoJsOptions: {
          autoplay: false,
          controls: true,
          sources: [{
            src: 'http://127.0.0.1:8888/live/' + props.streamKey + '/index.m3u8',
            type: 'application/x-mpegURL'
          }], fluid: true }
      },
      () => {
        this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
        });
      });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div className="user-stream">
        <div className="user-stream-video">
          {this.state.stream ? (
            <div data-vjs-player style={{width: "100%!important"}}>
              <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered"/>
            </div>
          ) : ' Loading ... '}
        </div>
      </div>
    )
  }
}
