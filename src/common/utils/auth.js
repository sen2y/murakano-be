const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');

exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            nickname: user.nickname,
        },
        config.jwtSecret,
        { expiresIn: '24h' }
    );
};

exports.verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

exports.isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }
        if (!user) {
            return res.status(401).json({ message: '인증되지 않은 사용자' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

exports.isLoggedIn = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }
        if (!user) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

exports.isNotLoggedIn = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }
        if (user) {
            return res.status(403).json({ message: '이미 로그인된 상태입니다.' });
        }
        next();
    })(req, res, next);
};
