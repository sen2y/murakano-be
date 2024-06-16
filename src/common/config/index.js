const dotenv = require('dotenv');
const path = require('path');

const env = dotenv.config({ path: path.resolve(__dirname, './env/.env') });
if (env.error) {
    console.warn('.env 파일을 찾을 수 없습니다.');
}

const conf = {
    port: process.env.PORT,
    corsWhiteList: process.env.CORS_WHITELIST,
    mongoURL: process.env.MONGO_URL,
};

module.exports = conf;
