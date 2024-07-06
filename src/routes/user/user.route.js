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
    UserRequests,
    UserRequestsAll,
    deleteRequest,
    updateRequest,
    getRole,
} = require('./user.controller');
const { isLoggedIn, isNotLoggedIn } = require('../../common/utils/auth');
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

// 요청 조회
userRouter.get('/requests', isLoggedIn, UserRequests); // 요청 목록 조회
userRouter.get('/requests/all', isLoggedIn, UserRequestsAll); // 모든 요청 목록 조회
userRouter.get('/role', isLoggedIn, getRole); // 사용자 역할 가져오기
userRouter.delete('/requests/:word', isLoggedIn, deleteRequest); // 사용자 요청 삭제
userRouter.post('/requests/:word', isLoggedIn, updateRequest); // 사용자 요청 수정

module.exports = userRouter;
