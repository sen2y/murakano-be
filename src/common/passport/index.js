const passport = require('passport');
const local = require('./localStrategy');
const jwtStrategy = require('./jwtStrategy');

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

    local(); // LocalStrategy 초기화
    jwtStrategy(); // JWTStrategy 초기화
};
