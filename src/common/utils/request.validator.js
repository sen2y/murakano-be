const ErrorMessage = require('../../common/constants/error-message');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();
addFormats(ajv);

exports.validateRequest = (schema, req) => {
    const validate = ajv.compile(schema);
    const isValid = validate(req);
    if (isValid) {
        return req;
    } else {
        const { errors } = validate;
        const message = errors && errors[0] ? errors[0].message : ErrorMessage.BAD_REQUEST;
        throw { message, type: 'ajv' };
    }
};
