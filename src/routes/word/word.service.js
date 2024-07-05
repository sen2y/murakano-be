const wordRepository = require('./word.repository');

// 검색 결과 조회
exports.getSearchWords = async (searchTerm) => {
    const searchWords = await wordRepository.getSearchWords(searchTerm);
    return searchWords;
};

// 인기검색어 조회
exports.getRankWords = async () => {
    const rankWords = await wordRepository.getRankWords();
    return rankWords;
};

// 연관검색어 조회
exports.getRelatedWords = async (keyword, limit) => {
    const relatedWords = await wordRepository.getRelatedWords(keyword, limit);
    return relatedWords;
};
