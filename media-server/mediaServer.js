const NodeMediaServer = require('node-media-server');
const config = require('./config/default').rtmp_server;
const express = require("express");
const cors = require("cors");
const rimraf = require("rimraf");

const mediaServerApp = express();
mediaServerApp.use(cors());
mediaServerApp.use(express.json());
mediaServerApp.use(express.urlencoded({ extended: true }));

const liveStreams = new Set();
const liveStreamSessions = new Map();
const mediaFolderPath = "./server/media/live/";

mediaServerApp.post("/start-stream", (req, res) => {
    console.log("Receiving new stream key from api server");
    console.log(req.body)
    const { streamKey } = req.body;
    console.log(streamKey);
    liveStreams.add(streamKey);
    console.log(liveStreams);
    res.send({ message: "Started stream" })
})

mediaServerApp.post("/stop-stream", (req, res) => {
    console.log("Receiving Stop stream key from api server");
    const { streamKey } = req.body;
    let streamSession = liveStreamSessions.get(streamKey);
    console.log(streamSession);
    console.log(liveStreamSessions);
    if (streamSession) {
        streamSession.reject();
    }
    liveStreams.delete(streamKey);

    console.log("after delete live streams left: ", liveStreams)
    console.log("after delete live sessions: ", liveStreamSessions)
    deleteStreamInfo(streamKey);
    res.send({ message: "Finished stream" })
})

nms = new NodeMediaServer(config);
nms.on('prePublish', async (id, streamPath, args) => {
    let session = nms.getSession(id);
    let streamKey = getStreamKeyFromStreamPath(streamPath);

    if (!liveStreams.has(streamKey)) {
        session.reject();
    } else {
        liveStreamSessions.set(streamKey, session);
    }
});

nms.on('donePublish', (id, streamPath, args) => {
    let streamKey = getStreamKeyFromStreamPath(streamPath);
    liveStreamSessions.delete(streamKey);
    // let streamSession = liveStreamSessions.get(streamKey);
    // streamSession.reject();
});

const deleteStreamInfo = (streamKey) => {
    let cleanFolderPath = mediaFolderPath + streamKey;
    rimraf(cleanFolderPath, function () {
        console.log("Cleaned directory ", cleanFolderPath);
    });
}

const getStreamKeyFromStreamPath = (streamPath) => {
    let parts = streamPath.split('/');
    return parts[parts.length - 1];
};

const mediaServerPort = 4000;
mediaServerApp.listen(mediaServerPort, () => {
    console.log(`mediaServerApp listening on port ${mediaServerPort}.`);
});

nms.run();

module.exports = nms;
