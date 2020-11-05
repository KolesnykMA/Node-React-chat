const env = require('../env.js');
const { database } = env;

module.exports = {
  databaseURL: database.databaseURL,
  databasePort: database.databasePort,
  databaseName: database.databaseName,
};