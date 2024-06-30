const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../common/config');
// const wordService = require('./word.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');
const { validateRequest } = require('../../common/utils/request.validator');
// const { rankWordsSchema, relatedWordsSchema } = require('./word.schema');

exports.getRankWords = async (req, res) => {};

exports.searchWords = async (req, res) => {
    const searchTerm = req.params.searchTerm; // 요청 파라미터에서 검색어 추출
};
