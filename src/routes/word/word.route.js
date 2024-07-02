const express = require('express');
const wordRouter = express.Router();

const { getRankWords, getSearchWords, getRelatedWords, getWords } = require('./word.controller');
const { isLoggedIn, isUser } = require('../../common/utils/auth');

// 메인 검색
wordRouter.get('/rank', getRankWords); // 인기 검색어 조회

// wordRouter.get('/:searchTerm', getRelatedWords); // params로 전달받은 검색어 searchTerm을 포함하는 단어 조회
wordRouter.post('/search/:searchTerm', isUser, getSearchWords);

// 전체 단어 목록 (쿼리 스트링에 정렬 & 페이지 정보)
wordRouter.get('/word', getWords);

module.exports = wordRouter;
