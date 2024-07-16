const relatedTermSchema = {
    type: 'object',
    properties: {
        searchTerm: {
            type: 'string',
            maxLength: 50,
        },
        limit: {
            type: 'string',
        },
    },
    required: ['searchTerm'],
    additionalProperties: false,
};

const searchTermSchema = {
    type: 'object',
    properties: {
        searchTerm: {
            type: 'string',
            maxLength: 50,
        },
    },
    required: ['searchTerm'],
    additionalProperties: false,
};

const wordListSchema = {
    type: 'object',
    properties: {
        limit: {
            type: 'number',
        },
        page: {
            type: 'number',
        },
        sort: {
            type: 'string',
            enum: ['asc', 'desc', 'popularity', 'recent'],
        },
    },
    required: ['limit', 'page', 'sort'],
    additionalProperties: false,
};

module.exports = { searchTermSchema, relatedTermSchema, wordListSchema };
