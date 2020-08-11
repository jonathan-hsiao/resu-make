const passport = require("passport");
const passportGoogle = require("passport-google-oauth20");
const { to } = require("await-to-js");

const { getUserByProviderId, createUser } = require("../../db/user");
const { signToken } = require("../utils");

const GoogleStrategy = passportGoogle.Strategy;

const strategy = app => {
    const strategyOptions = {
        clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.REACT_APP_SERVER_API_URL}/auth/google/callback`
    }

    const verifyCallback = async (accessToken, refreshToken, profile, done) => {
        let [err, user] = await to(getUserByProviderId(profile.id));
        if (err || user) {
            return done(err, user)
        }

        const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0];

        const [createdError, createdUser] = await to(
            createUser({
                provider: profile.provider,
                providerId: profile.id,
                email: verifiedEmail.value,
                password: null
            })
        );

        return done(createdError, createdUser);
    };

    passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

    app.get(
        `${process.env.REACT_APP_BASE_API_URL}/auth/google`,
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
        `${process.env.REACT_APP_BASE_API_URL}/auth/google/callback`,
        passport.authenticate("google", {failureRedirect: `${process.env.REACT_APP_AUTH_REDIRECT_URL}`}),
        (req, res) => {
            const userAuth = req.user;
            userAuth.resumes = null;
            return res
                .status(200)
                .cookie("jwt", signToken(userAuth), {
                    httpOnly: true
                })
                .redirect(`${process.env.REACT_APP_AUTH_REDIRECT_URL}`);
        }
    );

    return app;
};

module.exports = {
    strategy
};