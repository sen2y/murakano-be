const dotenv = require('dotenv');

dotenv.config();
const conf={
    port:process.env.PORT,
}

module.exports=conf;