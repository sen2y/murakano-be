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

module.exports = { nicknameCheckReqQuerySchema };
