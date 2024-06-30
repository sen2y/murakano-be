const Word = require('./word.model');

exports.getSearchWords = async (searchTerm, user) => {
    try {
        // 검색 결과
        const searchWords = await Word.findOne({ word: searchTerm });

        if (!searchWords) {
            console.log('Search term not found in Word collection');
        }

        return searchWords;
    } catch (error) {
        console.log('Error while getting search words:', error);
    }
};
