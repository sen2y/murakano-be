const userRepository = require('./user.repository');

exports.register = async (userData) => {
    const newUser = {
        email: userData.email,
        password: userData.password,
        nickname: userData.nickname,
    };
    return await userRepository.createUser(newUser);
};

exports.kakaoRegister = async (newUser) => {
    return await userRepository.createUser(newUser);
};

exports.isNicknameExist = async (nickname) => {
    const isUserExist = await userRepository.findUserByNickname(nickname);
    return isUserExist;
};

exports.isEmailExist = async (email) => {
    const isUserExist = await userRepository.findUserByEmail(email);
    return isUserExist;
};

exports.isKaKaoUserExist = async (snsId) => {
    const user = await userRepository.getUserBySnsId(snsId);
    return user;
};

exports.getRecentSearches = async (userId) => {
    const recentSearches = await userRepository.getRecentSearches(userId);
    return recentSearches;
};

exports.delRecentSearch = async (userId, searchTerm) => {
    return await userRepository.delRecentSearch(userId, searchTerm);
};

// 최근 검색어 저장
exports.updateRecentSearch = async (userID, searchTerm) => {
    if (userID) {
        await userRepository.updateRecentSearch(userID, searchTerm);
    }
};

// 단어 추가 및 수정
exports.postWords = async (userId, formData, nickname, type) => {
    try {
        const word = await userRepository.postWords(userId, formData, nickname, type);
        return word;
    } catch (error) {
        console.error('Error in userService.postWords:', error.message);
        throw new Error('Error processing word: ' + error.message);
    }
};