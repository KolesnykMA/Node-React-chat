module.exports = (Schema, model, name) => {
    const UserSchema = new Schema({
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        avatar: {
            type: String,
            required: false,
        }
    });

    return model(name, UserSchema);
};