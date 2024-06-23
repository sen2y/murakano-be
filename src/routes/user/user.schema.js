const commonSchemas = {
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
};

const registerBodySchema = {
    type: 'object',
    properties: {
        nickname: commonSchemas.nickname,
        email: commonSchemas.email,
        password: commonSchemas.password,
    },
    required: ['nickname', 'email', 'password'],
    additionalProperties: false,
};

const nicknameCheckReqQuerySchema = {
    type: 'object',
    properties: {
        nickname: commonSchemas.nickname,
    },
    required: ['nickname'],
    additionalProperties: false,
};

const emailCheckReqQuerySchema = {
    type: 'object',
    properties: {
        email: commonSchemas.email,
    },
    required: ['email'],
    additionalProperties: false,
};

const loginBodySchema = {
    type: 'object',
    properties: {
        email: commonSchemas.email,
        password: commonSchemas.password,
    },
    required: ['email', 'password'],
    additionalProperties: false,
};

module.exports = { registerBodySchema, nicknameCheckReqQuerySchema, emailCheckReqQuerySchema, loginBodySchema };
