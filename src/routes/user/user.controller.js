const userService = require('./user.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');
const SucesssMessage = require('../../common/constants/success-message');

exports.register = async (req, res) => {
    try {
        const newUser = await userService.register(req.body);

        data = {
            user_id: newUser._id,
        };
        sendResponse.created(res, {
            message: SucesssMessage.REGISTER_SUCCESSS,
            data,
        });
    } catch (err) {
        sendResponse.fail(req, res, ErrorMessage.REGISTER_ERROR);
    }
};
