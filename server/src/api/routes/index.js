const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');
const messageRoutes = require('./messageRoutes');
const jwtValidation = require('../middlewares/jwtValidation.middleware');

module.exports = app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', //jwtValidation,
     userRoutes);
  app.use('/api/chats', jwtValidation, chatRoutes);
  app.use('/api/messages', jwtValidation, messageRoutes);
};