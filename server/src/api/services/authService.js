const userRepository = require("../../data/repositories/userRepository.js");
const jwt = require('jsonwebtoken');
const { secret, expireTime } = require("../../data/config/jwtConfig")

module.exports = {
  login: async (userData) => {
    try {
      const { login, password } = userData;
      const currentUser = await userRepository.getByLogin(login);

      if(!currentUser){
        throw Error('LOGIN_NOT_EXISTS');
      }

      if (currentUser.password !== password){
        throw Error('WRONG_PASSWORD');
      }

      const token = jwt.sign({ user_id: currentUser._id }, secret);

      return {
        currentUser,
        token
      };
    } catch (error) {
      throw Error(error.message)
      // return {
      //     error: error.message
      // };
    }

  },

  register : async (userData) => {
    try {
      const newUser = await userRepository.addUser(userData);

      return {
        newUser
      };
    } catch (error) {
      throw new Error(error.message)
      // return {
      //     error: error.message
      // };
    }
  },

  getUser: async () => {
    try {
      const newUser = await userRepository.addUser(userData);

      return {
        newUser
      };
    } catch (error) {
      throw new Error(error.message)
    }
  }
}