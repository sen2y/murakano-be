const passport = require('passport');
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
const { generateToken } = require('../../common/utils/auth');
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
            const token = generateToken(user);

            return sendResponse.ok(res, {
                message: SucesssMessage.LOGIN_SUCCESSS,
                token,
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

        const { accessToken } = await getKakaoToken(code);
        const { snsId, email, nickname } = await getUserInfo(accessToken);

        const kakaoUser = { snsId: snsId, email, nickname, provider: 'kakao' };

        let user = await userService.isKaKaoUserExist(kakaoUser.snsId);
        if (!user) {
            user = await userService.kakaoRegister(kakaoUser);
        }
        const token = generateToken(user);
        sendResponse.ok(res, {
            message: SucesssMessage.LOGIN_SUCCESSS,
            token,
        });
    } catch (err) {
        console.log(err);
        sendResponse.fail(req, res, ErrorMessage.KAKAO_LOGIN_ERROR);
    }
};

exports.getProfile = (req, res) => {
    const { _id, nickname, email } = req.user;
    const data = { _id, nickname, email };
    sendResponse.ok(res, {
        message: SucesssMessage.GET_PROFILE_SUCCESS,
        data,
    });
};
