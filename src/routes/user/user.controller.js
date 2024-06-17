const userService = require('./user.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');

// TODO : controller에서 validation 필요

exports.register = async (req, res) => {
    try {
        const newUser = await userService.register(req.body);

        data = { user_id: newUser._id };
        sendResponse.created(res, {
            message: SucesssMessage.REGISTER_SUCCESSS,
            data,
        });
    } catch (err) {
        sendResponse.fail(req, res, ErrorMessage.REGISTER_ERROR);
    }
};

exports.isNicknameExist = async (req, res) => {
    try {
        const isUserExist = await userService.isNicknameExist(req.query.nickname);
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
        sendResponse.fail(req, res, ErrorMessage.NICKNAME_CHECK_ERROR);
    }
};

exports.isEmailExist = async (req, res) => {
    try {
        const isUserExist = await userService.isEmailExist(req.query.email);
        data = { isUserExist };

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
        sendResponse.fail(req, res, ErrorMessage.EMAIL_CHECK_ERROR);
    }
};
