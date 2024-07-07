const Word = require('./word.model');
const User = require('../user/user.model');

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

exports.getRelatedWords = async (searchTerm, limit) => {
    try {
        const relatedWords = await Word.find({ word: new RegExp(searchTerm, 'i') })
            .sort({ freq: -1 })
            .limit(parseInt(limit));
        const wordNames = relatedWords.map((word) => word.word);
        return wordNames;
    } catch (error) {
        console.log('Error while getting related words:', error);
        return null;
    }
};

exports.addWord = async (requestId) => {
    try {
        // requestId에 해당하는 request를 찾습니다.
        const user = await User.findOne({ 'requests._id': requestId });
        if (!user) {
            console.log('User with the given request not found');
            return null;
        }

        const request = user.requests.id(requestId);
        if (!request) {
            console.log('Request not found');
            return null;
        }

        const newWord = new Word({
            word: request.word,
            awkPron: request.awkPron,
            comPron: request.comPron,
            info: request.info,
            suggestedBy: request.suggestedBy,
        });

        await newWord.save();
        console.log('Word added successfully');

    } catch (error) {
        console.log('Error while adding word:', error);
        return null;
    }
};