const express = require('express');
const wordRouter = express.Router();

const { getRankWords, getRelatedWords, postWords } = require('./word.controller');

// 인기 검색어 조회
wordRouter.get('/rank', getRankWords);
// 연관검색어 : 쿼리스트링으로 전달받은 검색어 searchTerm을 포함하는 단어 조회
wordRouter.get('/keyword', getRelatedWords);

wordRouter.post('/requests', postWords);

module.exports = wordRouter;
