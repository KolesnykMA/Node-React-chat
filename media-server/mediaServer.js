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
const mediaFolderPath = "./server/media/live";

mediaServerApp.post("/start-stream", (req, res) => {
    const { streamKey } = req.body;
    liveStreams.add(streamKey);
    res.send({ message: "Started stream" })
})

mediaServerApp.post("/stop-stream", (req, res) => {
    const { streamKey } = req.body;
    let streamSession = liveStreamSessions.get(streamKey);
    streamSession.reject();
    liveStreams.delete(streamKey);
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
    let streamSession = liveStreamSessions.get(streamKey);
    streamSession.reject();
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
