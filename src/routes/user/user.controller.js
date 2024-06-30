const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../common/config');

const userService = require('./user.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');
const { validateRequest } = require('../../common/utils/request.validator');
const {
    nicknameCheckReqQuerySchema,
    registerBodySchema,
    emailCheckReqQuerySchema,
    loginBodySchema,
} = require('./user.schema');
const { generateAccessToken, generateRefreshToken } = require('../../common/utils/auth');
const { getKakaoToken, getUserInfo } = require('../../common/utils/kakao');

exports.register = async (req, res) => {
    try {
        const validData = validateRequest(registerBodySchema, req.body);
        const newUser = await userService.register(validData);

        const data = { user_id: newUser._id };
        sendResponse.created(res, {
            message: SucesssMessage.REGISTER_SUCCESSS,
            data,
        });
    } catch (err) {
        console.log(err);
        if (err?.type) {
            return sendResponse.badRequest(res, err.message);
        }
        sendResponse.fail(req, res, ErrorMessage.REGISTER_ERROR);
    }
};

exports.isNicknameExist = async (req, res) => {
    try {
        const { nickname } = validateRequest(nicknameCheckReqQuerySchema, req.query);

        const isUserExist = await userService.isNicknameExist(nickname);
        data = { isUserExist };

        if (isUserExist) {
            return sendResponse.badRequest(res, {
                message: ErrorMessage.EXIST_NICKNAME,
                data,
            });
        }

        return sendResponse.ok(res, {
            message: SucesssMessage.AVAILABLE_NICKNAME,
            data,
        });
    } catch (err) {
        if (err?.type) {
            return sendResponse.badRequest(res, err.message);
        }
        sendResponse.fail(req, res, ErrorMessage.NICKNAME_CHECK_ERROR);
    }
};

exports.isEmailExist = async (req, res) => {
    try {
        const { email } = validateRequest(emailCheckReqQuerySchema, req.query);

        const isUserExist = await userService.isEmailExist(email);
        const data = { isUserExist };

        if (isUserExist) {
            return sendResponse.badRequest(res, {
                message: ErrorMessage.EXIST_EMAIL,
                data,
            });
        }
        return sendResponse.ok(res, {
            message: SucesssMessage.AVAILABLE_EMAIL,
            data,
        });
    } catch (err) {
        if (err?.type) {
            return sendResponse.badRequest(res, err.message);
        }
        sendResponse.fail(req, res, ErrorMessage.EMAIL_CHECK_ERROR);
    }
};

exports.localLogin = async (req, res, next) => {
    try {
        req.body = validateRequest(loginBodySchema, req.body);
        passport.authenticate('local', (authError, user, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (!user) {
                return sendResponse.unAuthorized(res, { message: info.message });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('accessToken', accessToken, config.cookieInAccessTokenOptions);
            res.cookie('refreshToken', refreshToken, config.cookieInRefreshTokenOptions);

            return sendResponse.ok(res, {
                message: SucesssMessage.LOGIN_SUCCESSS,
            });
        })(req, res, next);
    } catch (err) {
        if (err?.type) {
            return sendResponse.badRequest(res, err.message);
        }
        sendResponse.fail(req, res, ErrorMessage.LOGIN_ERROR);
    }
};

exports.kakaoLogin = async (req, res) => {
    try {
        const { code } = req.body;
        const { kakaoAccessToken } = await getKakaoToken(code);
        const { snsId, email, nickname } = await getUserInfo(kakaoAccessToken);

        const kakaoUser = { snsId: snsId, email, nickname, provider: 'kakao' };

        let user = await userService.isKaKaoUserExist(kakaoUser.snsId);
        if (!user) {
            user = await userService.kakaoRegister(kakaoUser);
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie('accessToken', accessToken, config.cookieInAccessTokenOptions);
        res.cookie('refreshToken', refreshToken, config.cookieInRefreshTokenOptions);

        sendResponse.ok(res, {
            message: SucesssMessage.LOGIN_SUCCESSS,
        });
    } catch (err) {
        sendResponse.fail(req, res, ErrorMessage.KAKAO_LOGIN_ERROR);
    }
};

exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        // NOTE : 로그인 하지 않은 유저도 refresh token이 없는 경우에 해당하기 때문에, ok로 응답
        console.log(ErrorMessage.NO_REFRESH_TOKEN);
        return sendResponse.ok(res, {
            message: ErrorMessage.NO_REFRESH_TOKEN,
        });
    }

    jwt.verify(refreshToken, config.jwtRefreshSecret, (err, user) => {
        if (err)
            return sendResponse.forbidden(res, {
                message: ErrorMessage.REFRESH_TOKEN_ERROR,
            });

        const newAccessToken = generateAccessToken({ _id: user.userId, nickname: user.nickname, email: user.email });
        const newRefreshToken = generateRefreshToken({ _id: user.userId, nickname: user.nickname, email: user.email });

        res.cookie('accessToken', newAccessToken, config.cookieInAccessTokenOptions);
        res.cookie('refreshToken', newRefreshToken, config.cookieInRefreshTokenOptions);

        sendResponse.ok(res, {
            message: SucesssMessage.REFRESH_TOKEN,
            newAccessToken: newAccessToken,
            newRefreshToken: newRefreshToken,
        });
    });
};

exports.getProfile = (req, res) => {
    const { _id, nickname, email } = req.user;
    const data = { _id, nickname, email };
    sendResponse.ok(res, {
        message: SucesssMessage.GET_PROFILE_SUCCESS,
        data,
    });
};

exports.logout = (_, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return sendResponse.ok(res, {
        message: SucesssMessage.LOGOUT_SUCCESS,
    });
};

exports.RecentSearches = async (req, res) => {
    try {
        const { _id } = req.user;
        const recentSearches = await userService.getRecentSearches(_id);
        sendResponse.ok(res, {
            message: SucesssMessage.RECENT_WORDS_SUCCESS,
            data: { recentSearches },
        });
    } catch (err) {
        console.log(err);
        if (err?.type) {
            return sendResponse.badRequest(res, err.message);
        }
        sendResponse.fail(req, res, ErrorMessage.RECENT_WORDS_ERROR);
    }
};
