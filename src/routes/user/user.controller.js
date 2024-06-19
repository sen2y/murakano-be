const userService = require('./user.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');
const { validateRequest } = require('../../common/utils/request.validator');
const { nicknameCheckReqQuerySchema } = require('./user.schema');

exports.register = async (req, res) => {
    // TODO : validation 적용
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
    // TODO : validation 적용
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
