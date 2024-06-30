const express = require('express');
const wordRouter = express.Router();

const { getRankWords, searchWords } = require('./word.controller');

// 메인 검색

wordRouter.get('/rank', getRankWords); // 인기 검색어 조회
wordRouter.get('/search/:searchTerm', searchWords); // params로 전달받은 검색어 searchTerm을 포함하는 단어 조회

module.exports = wordRouter;
