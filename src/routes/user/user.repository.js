const User = require('./user.model');

exports.createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (err) {
        console.log(err);
    }
};
