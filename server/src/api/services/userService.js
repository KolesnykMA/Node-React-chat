const userRepository = require("../../data/repositories/userRepository.js");

module.exports = {
  getAll: async (params) => {
    try {
      // TODO validate input params

      return await userRepository.getAllUsers(params);
    } catch (error) {
      throw Error(error.message);
    }
  },

  getById: async (userId) => {
    try {
      // TODO validate input params

      const user = await userRepository.getById(userId);

      return {
        _id: user._id,
        email: user.email,
        username: user.username,
        login: user.login,
        stream_key: user.stream_key,
      };
    } catch (error) {
      throw error;
    }
  },

  create: async (body) => {
    try {
      // TODO validate input params

      return await userRepository.createUser(body);
    } catch (error) {
      throw Error(error.message);
    }
  },

  update: async (chatData) => {
    try {
      //TODO validate params

      const { userId, body } = chatData;

      //TODO if user exists

      return await userRepository.updateUserById(userId, body);
    } catch (error) {
      throw Error(error.message);
    }
  },

  delete: async (userId) => {
    try {
      //TODO validate params

      return await userRepository.deleteUserById(userId);
    } catch (error) {
      throw Error(error.message);
    }
  },
}
