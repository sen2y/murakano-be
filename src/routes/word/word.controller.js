const wordService = require('./word.service');
const userService = require('../user/user.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SuccessMessage = require('../../common/constants/success-message');
const { validateRequest } = require('../../common/utils/request.validator');
const { searchTermSchema, relatedTermSchema } = require('./word.schema');
const Word = require('./word.model');

// 검색어 조회
exports.getSearchWords = async (req, res) => {
    try {
        const _id = req?.user ? req.user._id : null;
        // 검색어 검증
        const validData = validateRequest(searchTermSchema, req.params);
        // 요청 파라미터에서 검색어 추출
        const searchTerm = validData.searchTerm;
        // 검색어 조회
        const data = await wordService.getSearchWords(searchTerm);
        if (_id) {
            await userService.updateRecentSearch(_id, searchTerm);
        }
        const message = data ? SucesssMessage.SEARCH_WORDS_SUCCESS : SucesssMessage.SEARCH_WORDS_NONE;
        sendResponse.ok(res, {
            message,
            data,
        });
    } catch (error) {
        console.log(error);
        if (error?.type) {
            return sendResponse.badRequest(res, error.message);
        }
        sendResponse.fail(req, res, ErrorMessage.SEARCH_WORDS_ERROR);
    }
};

// 인기 검색어 조회
exports.getRankWords = async (req, res) => {
    try {
        const data = await wordService.getRankWords();
        sendResponse.ok(res, {
            message: SuccessMessage.RANK_WORDS_SUCCESS,
            data,
        });
    } catch (error) {
        sendResponse.fail(req, res, ErrorMessage.RANK_WORDS_ERROR);
    }
};

// 연관검색어 : 쿼리스트링으로 전달받은 검색어 searchTerm을 포함하는 단어 조회
exports.getRelatedWords = async (req, res) => {
    try {
        let { searchTerm, limit } = req.query;
        searchTerm = validateRequest(relatedTermSchema, searchTerm);
        const data = await wordService.getRelatedWords(searchTerm, limit);
        sendResponse.ok(res, {
            message: SuccessMessage.RELATED_WORDS_SUCCESS,
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
        console.log(word);
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
            message: SuccessMessage.REGISTER_WORDS_SUCCESS,
            data,
        })
    } catch (error) {
        sendResponse.fail(req, res, ErrorMessage.REGISTER_WORDS_ERROR)

    }
};
