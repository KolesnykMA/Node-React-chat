const dotenv = require('dotenv');
dotenv.config();

const devEnv = {
  application: {
    serverPort: process.env.SERVER_PORT_DEV,
    socketPort: process.env.SOCKET_PORT_DEV
  },
  database: {
    databaseURL: process.env.DB_URL_DEV,
    databasePort: process.env.DB_PORT_DEV,
    databaseName: process.env.DB_NAME_DEV
  }
};

const prodEnv = {
  application: {
    serverPort: process.env.SERVER_PORT_PROD,
    socketPort: process.env.SOCKET_PORT_PROD
  },
  database: {
    databaseURL: process.env.DB_URL_DEV_PROD,
    databasePort: process.env.DB_PORT_PROD,
    databaseName: process.env.DB_NAME_PROD
  }
};

module.exports = process.env.NODE_ENV === "dev" ? devEnv : prodEnv;