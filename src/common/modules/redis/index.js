const conf = require('../../config');
const { createClient } = require('redis');

const redisClient = createClient({
    url: `redis://${conf.redisUsername}:${conf.redisPassword}@${conf.redisHost}:${conf.redisPort}/0`,
    legacyMode: true, // 레거시 모드를 사용하는 경우에만 설정합니다.
});

redisClient.on('connect', () => {
    console.info('✅ Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

redisClient.connect().then();
const redisCli = redisClient.v4;

module.exports = redisCli;
