const express = require("express");
const cors = require("cors");
// const path = require("path");
// const fs = require("fs")
// const routes = require("./api/routes/index.js");


// import authorizationMiddleware from './api/middlewares/authorizationMiddleware.js';
// import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware.js';
//
// import routesWhiteList from './config/routesWhiteListConfig.js';

const dataBaseConnector = require('./data/db/connection.js');

// import env from './env.js';
// import './config/passportConfig.js';

const app = express();

app.use(cors());
//
// app.use(passport.initialize());
//
dataBaseConnector
    .connect()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
//
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());


app.use('/api/users/', require('./api/routes/userRoute'));
app.use('/api/chats/', require('./api/routes/chatRoute'));
// app.use('/api/messages/', require('./api/samples'));
app.use('/api/auth/', require('./api/routes/authRoute'));

//
// const staticPath = path.resolve() + '/../client/build';
// app.use(express.static(staticPath));

// app.get('*', (req, res) => {
//     res.write(fs.readFileSync(`${path.resolve()}/../client/build/index.html`));
//     res.end();
// });

// app.use(errorHandlerMiddleware);
// app.listen(env.app.port, () => {
//     // eslint-disable-next-line no-console
//     console.log(`Server listening on port ${env.app.port}!`);
// });

app.listen(3001, () => {
    console.log(`Server listening on port 3000!`);
});