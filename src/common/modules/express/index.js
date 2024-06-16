const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const conf = require('../../config/index');
const router = require('../../../routes/index');

module.exports = expressLoader = (app) => {
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
                if (origin !== null || conf.corsWhiteList?.indexOf(origin) !== -1) {
                    return callback(null, true);
                }
                callback(new Error('CORS ERROR'));
            },
        })(req, res, next);
    });

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
