const back_dev_url = "http://localhost:3001";
const axios = require("axios");
const queryString = require("query-string");

const getStreamsInfo = async (liveStreams) => {
    return new Promise((res, rej) => {
        axios
            .get(
                `${back_dev_url}/api/streams`,
                {
                    params: {
                        streams: liveStreams
                    }
            })
            .then(response => {
                const messages = response.data
                res(messages.map(message => {
                    return {
                        messageCreatorId: message.messageCreatorId,
                        messageText: message.messageText
                    }
                }))
            })
            .catch(error => {
                rej(error)
            })

    })
};
