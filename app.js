const express = require('express');
const conf = require('./src/common/config/index');
const expressLoader = require('./src/common/modules/express');


const app = express();

const initServer = async () =>{
    expressLoader(app);
    
    app.listen(conf.port, () => {
        console.log(`app listening on http://localhost:${conf.port}`);
    });
};

initServer();

