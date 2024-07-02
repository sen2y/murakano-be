const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const User = require('../../routes/user/user.model');
const config = require('../config');

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['accessToken'];
    }
    console.log(`Access token: ${token}`);
    return token;
};

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.jwtAccessSecret,
};

module.exports = () => {
    passport.use(
        new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                console.log(jwtPayload);
                const user = await User.findById(jwtPayload.userId);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                console.error(error);
                return done(error, false);
            }
        })
    );
};
