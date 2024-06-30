const wordRepository = require('./word.repository');
const userRepository = require('../user/user.repository');

exports.getSearchWords = async (_id, searchTerm) => {
    // 최근 검색어 저장 로직
    const saveRecentSearch = userRepository.updateRecentSearch(_id, searchTerm);

    // 검색 결과
    const searchWords = wordRepository.getSearchWords(_id, searchTerm);

    // 모든 비동기 작업이 완료될 때까지 기다린 후 결과를 반환
    await Promise.all([saveRecentSearch, searchWords]);

    // 검색 결과 return
    return searchWords;
};
