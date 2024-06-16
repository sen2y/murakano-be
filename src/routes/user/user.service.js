const bcrypt = require('bcrypt');
const userRepository = require('./user.repository');

exports.register = async (userData) => {
    const hash = await bcrypt.hash(userData.password, 12);
    const newUser = {
        email: userData.email,
        password: hash,
        nickname: userData.nickname,
    };
    return await userRepository.createUser(newUser);
};
