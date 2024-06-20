const passport = require('passport');
const localStrategy = require('./localStrategy');
const jwtStrategy = require('./jwtStrategy');
const User = require('../../routes/user/user.model');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    // 초기화
    localStrategy();
    jwtStrategy();
};
