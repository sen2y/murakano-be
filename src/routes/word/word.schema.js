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

module.exports = { searchTermSchema };
