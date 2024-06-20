const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const conf = require('../../config');
const passportConfig = require('../../passport');
const router = require('../../../routes/index');

module.exports = expressLoader = (app) => {
    passportConfig();

    app.use(morgan('dev'));
    app.use(helmet());

    // 스크립트 보안 설정을 위한 난수 생성 ( xss 방어 )
    app.use((_, res, next) => {
        res.locals.nonce = crypto.randomBytes(16).toString('hex');
        next();
    });

    // CORS 설정
    app.use((req, res, next) => {
        cors({
            credentials: true,
            origin: (origin, callback) => {
                if (origin === undefined || (origin && conf.corsWhiteList?.indexOf(origin) !== -1)) {
                    return callback(null, true);
                }
                callback(new Error('CORS ERROR'));
            },
        })(req, res, next);
    });

    app.use(
        session({
            name: 'user',
            resave: false,
            saveUninitialized: false,
            secret: conf.cookieSecret,
            cookie: {
                // cleint 쿠키 접근 불가
                httpOnly: true,
                // TODO : ssl 적용하면 true로 변경
                secure: false,
                // 24h
                maxAge: 86400000,
            },
        })
    );

    // Passport 세팅
    app.use(passport.initialize());
    app.use(passport.session());

    // Body Parser 세팅
    app.use(
        express.json({
            limit: '50mb',
        })
    );

    // JSON Parser 세팅
    app.use(
        express.urlencoded({
            limit: '50mb',
            extended: true,
        })
    );

    // Cookie Parser 세팅
    app.use(cookieParser());

    // Router 설정
    app.use(router);

    app.all('*', (req, res) => {
        res.status(404).json(`Can't find ${req.originalUrl} on this server`);
    });
};
