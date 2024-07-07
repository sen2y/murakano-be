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

exports.updateRecentSearch = async (_id, searchTerm) => {
    try {
        const user = await User.findById(_id).exec();
        if (!user) {
            console.log('User not found');
        }
        const recentSearch = user.recentSearches.find((search) => search.searchTerm === searchTerm);
        if (recentSearch) {
            // 검색어가 이미 존재하는 경우
            if (recentSearch.deletedAt) {
                // deletedAt이 null이 아닌 경우, deletedAt을 null로 바꾸고 updatedAt 수정
                recentSearch.deletedAt = null;
            }
            // updatedAt만 수정
            recentSearch.updatedAt = Date.now();
        } else {
            // 검색어가 존재하지 않는 경우, updatedAt과 용어 추가
            user.recentSearches.push({ searchTerm, updatedAt: Date.now() });
        }

        await user.save();
    } catch (err) {
        console.error(err);
    }
};

// exports.postWords = async (userId, formData, nickname, type) => {
//     try {
//         const user = await User.findById(userId).exec();
//         if (!user) {
//             throw new Error('User not found');
//         }

//         let wordExists = false;

//         // 요청 목록을 순회하며 단어를 수정하거나 확인
//         user.requests = user.requests.map(req => {
//             if (req.word.toLowerCase() === formData.devTerm.toLowerCase()) {
//                 wordExists = true;

//                 // 수정 요청인 경우, 기존 단어 정보를 업데이트
//                 if (type === 'mod') {
//                     return {
//                         ...req,
//                         info: formData.addInfo,
//                         awkPron: formData.awkPron,
//                         comPron: formData.commonPron,
//                         type: 'mod',
//                         suggestedBy: nickname,
//                         status: 'pend'
//                     };
//                 }
//             }
//             return req;
//         });

//         // 추가 요청인 경우, 기존 단어가 없을 때만 추가
//         if (type === 'add') {
//             if (!wordExists) {
//                 user.requests.push({
//                     word: formData.devTerm,
//                     info: formData.addInfo,
//                     awkPron: formData.awkPron,
//                     comPron: formData.commonPron,
//                     deletedAt: null,
//                     status: 'pend',
//                     type: 'add',
//                     suggestedBy: nickname
//                 });
//             } else {
//                 throw new Error('Word already exists in user requests');
//             }
//         }

//         await user.save();
//         console.log("User after modification:", JSON.stringify(user.requests, null, 2));
//         return user.requests.find(req => req.word.toLowerCase() === formData.devTerm.toLowerCase());
//     } catch (err) {
//         console.error("Error in postWords:", err);
//         throw err;
//     }
// };

// 단어 추가 및 수정
exports.postWords = async (userId, formData, nickname, type) => {
    try {
        const user = await User.findById(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }

        console.log("User before modification:", JSON.stringify(user.requests, null, 2));

        if (type === 'add') {
            user.requests.push({
                word: formData.devTerm,
                info: formData.addInfo,
                awkPron: formData.awkPron,
                comPron: formData.commonPron,
                deletedAt: null,
                status: 'pend',
                type: 'add',
                suggestedBy: nickname // nickname 추가
            });
        } else if (type === 'mod') {
            const request = user.requests.find(req => req.word === formData.devTerm);
            if (!request) {
                user.requests.push({
                    word: formData.devTerm,
                    info: formData.addInfo,
                    awkPron: formData.awkPron,
                    comPron: formData.commonPron,
                    deletedAt: null,
                    status: 'pend',
                    type: 'mod',
                    suggestedBy: nickname // nickname 추가
                })
            } else {
                console.log('이미 같은 단어 수정 요청이 존재합니다.');
                throw new Error('Word not found');
            }
        } else {
            throw new Error('Invalid type');
        }

        await user.save();
        console.log("User after modification:", JSON.stringify(user.requests, null, 2));
        return user.requests.find(req => req.word === formData.devTerm);
    } catch (err) {
        console.error(err);
        throw err;
    }
};
