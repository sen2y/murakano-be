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

exports.getUserRequests = async (userId) => {
    const requests = await userRepository.getUserRequests(userId);
    return requests;
};

exports.getUserRequestsAll = async () => {
    const requests = await userRepository.getUserRequestsAll();
    return requests;
};

exports.deleteRequest = async (userId, requestWord) => {
    console.log("서비스 userid", userId)
    console.log("서비스 requestword", requestWord)
    const result = await userRepository.deleteRequest(userId, requestWord);
    return result;
};

exports.getRole = async (userId) => {
    const role = await userRepository.getRole(userId);
    return role;
};

exports.updateRequest = async (userId, requestWord, formData) => {
    if(userId) {
        await userRepository.updateRequest(userId, requestWord, formData);
    }
};