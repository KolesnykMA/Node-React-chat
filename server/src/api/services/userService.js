const userRepository = require("../../data/repositories/userRepository.js");

module.exports = {
  getAll: async () => {
    try {
      return await userRepository.getAllUsers();
    } catch (error) {
      return {
        error: error.message
      };
    }
  },

  getById: async (userId) => {
    try {
      const user = await userRepository.getUserById(userId);

      return {
        email: user.email,
        username: user.username,
        login: user.login
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  },
}