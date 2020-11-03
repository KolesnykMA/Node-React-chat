const userRepository = require("../../data/repositories/userRepository.js");

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

            return {
                currentUser
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
    }
}