const express = require('express');
const { register, isNicknameExist, isEmailExist, localLogin } = require('./user.controller');
const { isLoggedIn, isNotLoggedIn } = require('../../common/utils/auth');
const userRouter = express.Router();

// 회원가입
userRouter.post('/register', isNotLoggedIn, register);
userRouter.get('/check/nickname', isNicknameExist);
userRouter.get('/check/email', isEmailExist);

// 로그인
userRouter.post('/local/login', isNotLoggedIn, localLogin);

// NOTE : JWT 확인용. 삭제 예정
userRouter.get('/profile', isLoggedIn, (req, res) => {
    res.json({ user: req.user });
});

module.exports = userRouter;
