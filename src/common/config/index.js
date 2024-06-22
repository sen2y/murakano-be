const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, '../../../.env');

const env = dotenv.config({ path: envPath });
if (env.error) {
    console.warn('.env 파일을 찾을 수 없습니다.');
}

const conf = {
    port: process.env.PORT,
    corsWhiteList: process.env.CORS_WHITELIST,
    mongoURL: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,

    // social login
    kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
};

module.exports = conf;
