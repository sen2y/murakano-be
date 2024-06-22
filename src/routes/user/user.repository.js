const User = require('./user.model');

exports.createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (err) {
        console.log(err);
    }
};

exports.findUserByNickname = async (nickname) => {
    const userExists = await User.exists({ nickname });
    return userExists ? true : false;
};

exports.findUserByEmail = async (email) => {
    const userExists = await User.exists({ email });
    return userExists ? true : false;
};

exports.getUserBySnsId = async (snsId) => {
    const user = await User.findOne({ snsId, provider: 'kakao' });
    return user;
};
