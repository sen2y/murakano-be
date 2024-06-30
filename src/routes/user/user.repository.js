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

exports.getRecentSearches = async (_id) => {
    try {
        // 사용자 문서를 찾고 recentSearches 배열만 선택합니다.
        const user = await User.findById(_id).select('recentSearches').exec();

        // 최근 검색어 배열을 필터링, 정렬하고 상위 10개를 선택합니다.
        // recentSearches가 정의되지 않았을 경우 빈 배열로 처리합니다.
        const recentSearches = (user.recentSearches || [])
            .filter((search) => !search.deletedAt) // 삭제되지 않은 검색어만 선택
            .sort((a, b) => b.updatedAt - a.updatedAt) // 최근 검색순으로 정렬
            .slice(0, 10); // 상위 10개 선택

        // 검색어만 반환
        return recentSearches.map((search) => search.searchTerm);
    } catch (err) {
        console.error(err);
        return []; // 오류 발생 시 빈 배열 반환
    }
};

exports.delRecentSearch = async (_id, searchTerm) => {
    try {
        await User.findOneAndUpdate(
            { _id, 'recentSearches.searchTerm': searchTerm, 'recentSearches.deletedAt': null },
            { $set: { 'recentSearches.$.deletedAt': Date.now() } }
        );
    } catch (err) {
        console.error(err);
    }
};
