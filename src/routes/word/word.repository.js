const Word = require('./word.model');

exports.getSearchWords = async (searchTerm) => {
    try {
        // 대소문자 구분 없이 검색어를 찾기 위한 정규 표현식 사용
        const searchWords = await Word.findOne({ word: new RegExp(`^${searchTerm}$`, 'i') });

        if (!searchWords) {
            console.log('Search term not found in Word collection');
        }

        return searchWords;
    } catch (error) {
        console.log('Error while getting search words:', error);
        return null;
    }
};

exports.getRankWords = async () => {
    try {
        const words = await Word.find().sort({ freq: -1 }).limit(10);
        const wordNames = words.map((word) => word.word);
        return wordNames;
    } catch (error) {
        console.log('Error while getting rank words:', error);
        return null;
    }
};

// 전체 단어목록 조회
exports.findAllWords = async (isSorted, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const sortOrder = {};
        if (isSorted === 'asc' || isSorted === 'desc') {
            sortOrder.word = isSorted === 'asc' ? 1 : -1;
        } else if (isSorted === 'popularity') {
            sortOrder.freq = -1;
        } else if (isSorted === 'recent') {
            sortOrder.createdAt = -1;
            sortOrder.word = 1; // createdAt이 동일한 경우 단어 오름차순으로 정렬
        }

        const words = await Word.find().sort({ word: sortOrder }).skip(skip).limit(parseInt(limit, 10));
        return words;
    } catch (error) {
        console.log('Error while getting all words:', error);
        return null;
    }
};
