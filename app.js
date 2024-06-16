const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const appError = require('./utils/appError');
const userRouter = require('./routes/user/user.route');
const wordRouter = require('./routes/word/word.route');
const cookieParser = require('cookie-parser');
const passportConfig = require('./passport');
const dotenv = require('dotenv');

dotenv.config();
passportConfig();

const app = express();

app.use(morgan('dev'));
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
            },
        },
        crossOriginResourcePolicy: false,
    })
);

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

app.all('*', (req, _, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(function (err, _, res, next) {
    console.log(err);
    res.status(err.statusCode).json({ status: err.status, message: err.message });
    next();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
});
