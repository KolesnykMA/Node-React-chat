const { chat } = require("./chat");
const socketHandler = io => chat(io);

module.exports = {
  socketHandler
}