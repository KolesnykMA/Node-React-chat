const mongoose = require('mongoose');
const dataBaseConfig = require("../../config/dataBaseConfig");

class DataBaseConnector {
  constructor(dataBaseConfig) {
    const { databaseURL, databasePort, databaseName } = dataBaseConfig;
    this.databaseURL = databaseURL;
    this.databasePort = databasePort;
    this.databaseName = databaseName;
    this.databaseConnectionPath = `mongodb://${this.databaseURL}:${this.databasePort}/${this.databaseName}`;
  }

  async connect() {
    try {
      mongoose.set('useCreateIndex', true);
      await mongoose.connect(
        this.databaseConnectionPath,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
      )
    } catch (e) {
      throw `Error when connecting to ${this.databaseConnectionPath} error: ${e}.`
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
    } catch (e) {
      throw `Error when disconnecting to ${this.databaseConnectionPath} error: ${e}.`
    }
  }
}

module.exports = new DataBaseConnector(dataBaseConfig);