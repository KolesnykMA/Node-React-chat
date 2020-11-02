const { UserModel } = require('../models/index.js');
const BaseRepository =  require('./baseRepository.js');

class UserRepository extends BaseRepository {
    getAllUsers() {
        return this.getAll();
    }

    getUserById(id) {
        return this.getById(id);
    }

    async addUser(user) {
        const { login, email, password, username, avatar } = user;

        if (await this.model.findOne({ email })){
            throw new Error('EMAIL_EXISTS');
        }

        if (await this.model.findOne({ login })){
            throw new Error('LOGIN_EXISTS');
        }

        if (await this.model.findOne({ username })){
            throw new Error('USERNAME_EXISTS');
        }

        return this.create(user);
    }

    getByLogin(login) {
        return this.model.findOne({ login });
    }

    // getByEmail(email) {
    //     return this.model.findOne({ email });
    // }
    //
    // getByUsername(username) {
    //     return this.model.findOne({ username });
    // }
}

module.exports = new UserRepository(UserModel);