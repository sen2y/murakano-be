const wordService = require('./word.service');
const userService = require('../user/user.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');
const { validateRequest } = require('../../common/utils/request.validator');
const { rankWordsSchema, searchTermSchema } = require('./word.schema');

exports.getRankWords = async (req, res) => {};

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
