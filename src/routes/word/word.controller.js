const wordService = require('./word.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');
const { validateRequest } = require('../../common/utils/request.validator');
const { rankWordsSchema, searchTermSchema } = require('./word.schema');

exports.getRankWords = async (req, res) => {};

exports.getSearchWords = async (req, res) => {
    try {
        const { _id } = req.user;
        const validData = validateRequest(searchTermSchema, req.params); // 검색어 검증
        const searchTerm = validData.searchTerm; // 요청 파라미터에서 검색어 추출
        const data = await wordService.getSearchWords(_id, searchTerm); // 검색어 조회

        sendResponse.ok(res, {
            message: SucesssMessage.SEARCH_WORDS_SUCCESS,
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
