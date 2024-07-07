const Word = require('./word.model');
const User = require('../user/user.model');

exports.getSearchWords = async (searchTerm) => {
    try {
        // 대소문자 구분 없이 검색어를 찾기 위한 정규 표현식 사용
        const escapedSearchTerm = searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const searchWords = await Word.findOne({ word: { $regex: `^${escapedSearchTerm}$`, $options: 'i' } });

        if (!searchWords) {
            console.log('Search term not found in Word collection');
        }
        console.log(888, searchWords);
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

// 전체 단어목록 조회, 정렬 별 조건함수
exports.getAllWords = async (isSorted, page = 1, limit = 10) => {
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
        const words = await Word.find().sort(sortOrder).skip(skip).limit(parseInt(limit, 10));
        return words;
    } catch (error) {
        console.log('Error while getting all words:', error);
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
