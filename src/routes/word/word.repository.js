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
