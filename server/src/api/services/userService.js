const userRepository = require("../../data/repositories/userRepository.js");

module.exports = {
  getAll: async () => {
    try {
      return await userRepository.getAllUsers();
    } catch (error) {
      throw Error(error.message);
    }
  },

  getById: async (userId) => {
    try {
      const user = await userRepository.getById(userId);

      return {
        _id: user._id,
        email: user.email,
        username: user.username,
        login: user.login
      };
    } catch (error) {
      throw error;
    }
  },

  create: async () => {
    try {
      return await userRepository.getAllUsers();
    } catch (error) {
      throw Error(error.message);
    }
  },

  update: async () => {
    try {
      // return await userRepository.getAllUsers();
    } catch (error) {
      throw Error(error.message);
    }
  },

  delete: async () => {
    try {
      return await userRepository.getAllUsers();
    } catch (error) {
      throw Error(error.message);
    }
  },
}