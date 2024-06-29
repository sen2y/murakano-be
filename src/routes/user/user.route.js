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
userRouter.post('/refresh', isNotLoggedIn, refreshToken);
userRouter.post('/logout', isNotLoggedIn, logout);

userRouter.get('/profile', isLoggedIn, getProfile);

module.exports = userRouter;
