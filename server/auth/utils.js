const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db/schema");

const setup = () => {
    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch(err) {
            return done(err, null);
        }
    });
};

const signToken = (user) => {
    return jwt.sign({ data: user }, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: 900 //15 minute expiration
    });
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ success: false, data: "token error: please sign in" }); //no token provided

    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
        req.userData = decoded.data;
        next();
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, data: "token error: please sign in" }) //invalid token
    }
};

const hashPassword = async password => {
    if (!password) {
        throw new Error("Password was not provided.")
    }

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => {
    return await bcrypt.compare(candidate, actual);
};

module.exports = {
    setup,
    signToken,
    verifyToken,
    hashPassword,
    verifyPassword
};