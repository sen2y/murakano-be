const express = require('express');
const { register, isNicknameExist, isEmailExist } = require('./user.controller');
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.get('/check/nickname', isNicknameExist);
userRouter.get('/check/email', isEmailExist);

module.exports = userRouter;
