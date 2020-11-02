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
            return await userRepository.getUserById(userId);
        } catch (error) {
            return {
                error: error.message
            };
        }
    },
}