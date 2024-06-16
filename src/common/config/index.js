const dotenv = require('dotenv');

dotenv.config();
const conf={
    port:process.env.PORT,
    corsWhiteList: process.env.CORS_WHITELIST
}

module.exports=conf;