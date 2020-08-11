const utils = require("./utils");
const strategies = require("./strategies");

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

const initializeAuthentication = app => {
    utils.setup();
    pipe(strategies.GoogleStrategy, strategies.JWTStrategy)(app);
};

module.exports = {
    utils,
    initializeAuthentication,
    strategies
};