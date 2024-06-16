const mongoose = require('mongoose');
const conf = require('../../config/index');

mongoose.connect(conf.mongoURL);

const db = mongoose.connection;

function initDB() {
    db.once('open', () => console.log('✅  Connected to DB'));
    db.on('error', (error) => console.log(`❌ Error on DB Connection:${error}`));
}

module.exports = initDB;
