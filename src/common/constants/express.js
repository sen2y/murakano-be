const conf = require('../config');

const mode = {
    dev: 'development',
    prod: 'production',
};

exports.START_MESSAGE = `
================================================================
MURAKANO API Server has been started at localhost:${conf.port}
Mode : ${mode[conf.envMode]}
================================================================
`;
