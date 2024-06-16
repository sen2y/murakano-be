const userService = require('./user.service');
const sendResponse = require('../../common/utils/response-handler');
const ErrorMessage = require('../../common/constants/error-message');

exports.register = async (req, res) => {
    try {
        const newUser = await userService.register(req.body);
        console.log(newUser);
        sendResponse.created(res, {
            message: 'user registered successfully',
            user_id: newUser._id,
        });
    } catch (err) {
        sendResponse.fail(req, res, ErrorMessage.REGISTER_ERROR);
    }
};
