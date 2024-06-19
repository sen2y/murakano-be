const passport = require('passport');
const jwt = require('jsonwebtoken');

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
const config = require('../../common/config');
const { generateToken } = require('../../common/utils/auth');

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

// const { email, password } = validateRequest(loginBodySchema, req.body);
// exports.localLogin = async (req, res) => {

//     passport.authenticate('local', (authError, user, info) => {
//         if (authError) {
//             console.error(authError);
//             return next(authError);
//         }
//         if (!user) {
//             return sendResponse.unAuthorized(res, { message: info.message });
//         }
//         return req.login(user, (loginError) => {
//             if (loginError) {
//                 console.error(loginError);
//                 return next(loginError);
//             }
//             return sendResponse.ok(res, {
//                 message: SucesssMessage.LOGIN_SUCCESSS,
//                 user_id: user._id,
//             });
//         });
//     })(req, res, next);
// };

exports.localLogin = async (req, res, next) => {
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
};
