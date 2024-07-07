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

// 새로운 단어 생성
// NICKNAME 인자값 추가 
exports.postWords = async (userId, formData) => {
    try {
        const newWord = await userRepository.postWords(userId, formData);
        return newWord;
    } catch (error) {
        throw new Error('Error creating new word');
    }
};