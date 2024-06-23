const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../routes/user/user.model');

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email });
                    if (!user) {
                        return done(null, false, { message: '가입되지 않은 회원입니다.' });
                    }
                    const isMatch = await user.comparePassword(password);
                    if (!isMatch) {
                        return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                    }
                    return done(null, user);
                } catch (error) {
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};
