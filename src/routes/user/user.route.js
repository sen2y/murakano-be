const express = require('express');
const {
    register,
    isNicknameExist,
    isEmailExist,
    localLogin,
    kakaoLogin,
    getProfile,
    refreshToken,
    logout,
    recentSearches,
    delRecentSearch,
    postWords,
} = require('./user.controller');
const { isLoggedIn, isNotLoggedIn, isUser } = require('../../common/utils/auth');
const userRouter = express.Router();

// 회원가입
userRouter.post('/register', isNotLoggedIn, register);
userRouter.get('/check/nickname', isNicknameExist);
userRouter.get('/check/email', isEmailExist);

// 로그인
userRouter.post('/local/login', isNotLoggedIn, localLogin);
userRouter.post('/kakao/login', isNotLoggedIn, kakaoLogin);
userRouter.post('/refresh', refreshToken);
userRouter.post('/logout', logout);

userRouter.get('/profile', isLoggedIn, getProfile);

// 최근 검색어
userRouter.get('/recent', isLoggedIn, recentSearches); // 최근 검색어 조회
userRouter.delete('/:searchTerm', isLoggedIn, delRecentSearch); // 최근 검색어 삭제

//등록 요청
userRouter.post('/requests/new', isLoggedIn, postWords);

module.exports = userRouter;