const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./routes/user/user.route');
const wordRouter = require('./routes/word/word.route');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
});
