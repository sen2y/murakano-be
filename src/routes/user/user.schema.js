const registerBodySchema = {
    type: 'object',
    properties: {
        nickname: {
            type: 'string',
            maxLength: 10,
            pattern: '^[a-zA-Z0-9가-힣]+$',
        },
        email: {
            type: 'string',
            format: 'email',
            maxLength: 50,
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 20,
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>\\/\\\\?]).+$',
        },
    },
    required: ['nickname', 'email', 'password'],
    additionalProperties: false,
};

const nicknameCheckReqQuerySchema = {
    type: 'object',
    properties: {
        nickname: {
            type: 'string',
            maxLength: 10,
            pattern: '^[a-zA-Z0-9가-힣]+$',
        },
    },
    required: ['nickname'],
    additionalProperties: false,
};

const emailCheckReqQuerySchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email',
            maxLength: 50,
        },
    },
    required: ['email'],
    additionalProperties: false,
};

module.exports = { registerBodySchema, nicknameCheckReqQuerySchema, emailCheckReqQuerySchema };
