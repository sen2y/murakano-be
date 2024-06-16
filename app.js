const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./src/routes/user/user.route');
const wordRouter = require('./src/routes/word/word.route');
const cookieParser = require('cookie-parser');
const conf = require('./src/common/config/index')


const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// EB health check
app.get('/', (_, res) => {
    res.status(200).json({ message: 'Success' });
});
app.use('/users', userRouter);
app.use('/words', wordRouter);

app.all('*', (req, res) => {
    res.status(404).json(`Can't find ${req.originalUrl} on this server`)
});

app.listen(conf.port, () => {
    console.log(`app listening on http://localhost:${conf.port}`);
});
