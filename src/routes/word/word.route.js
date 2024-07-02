const express = require('express');
const wordRouter = express.Router();

const { getRankWords, getSearchWords, getRelatedWords } = require('./word.controller');
const { isLoggedIn, isUser } = require('../../common/utils/auth');

// 메인 검색
wordRouter.get('/rank', getRankWords); // 인기 검색어 조회

// wordRouter.get('/:searchTerm', getRelatedWords); // params로 전달받은 검색어 searchTerm을 포함하는 단어 조회
wordRouter.post('/search/:searchTerm', isUser, getSearchWords);

module.exports = wordRouter;
