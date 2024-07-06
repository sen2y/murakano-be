const wordService = require('./word.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');
const { validateRequest } = require('../../common/utils/request.validator');
const { searchTermSchema } = require('./word.schema');
const Word = require('./word.model');

// 인기 검색어 조회
exports.getRankWords = async (req, res) => {
    try {
        const data = await wordService.getRankWords();
        sendResponse.ok(res, {
            message: SucesssMessage.RANK_WORDS_SUCCESS,
            data,
        });
    } catch (error) {
        sendResponse.fail(req, res, ErrorMessage.RANK_WORDS_ERROR);
    }
};

// 연관검색어 : 쿼리스트링으로 전달받은 검색어 searchTerm을 포함하는 단어 조회
exports.getRelatedWords = async (req, res) => {
    try {
        const { keyword, limit } = req.query;
        keyword = validateRequest(searchTermSchema, keyword);
        const data = await wordService.getRelatedWords(keyword, limit);
        sendResponse.ok(res, {
            message: SucesssMessage.RELATED_WORDS_SUCCESS,
            data,
        });
    } catch (error) {
        sendResponse.fail(req, res, ErrorMessage.RELATED_WORDS_ERROR);
    }
};

// 등록요청 모달: 등록을 하면 DB에 upload
exports.postWords = async (req, res) => {
    try {
        const { word, awkPron, comPron, info } = req.body;
        // 새로운 단어 생성
        const newWord = new Word({
            word,
            awkPron,
            comPron,
            info
        });

        // 데이터베이스에 저장
        await newWord.save();

        sendResponse.ok(res, {
            message: SucesssMessage.REGISTER_WORDS_SUCCESS,
            data,
        })
    } catch (error) {
        sendResponse.fail(req, res, ErrorMessage.REGISTER_WORDS_ERROR)

    }
};
