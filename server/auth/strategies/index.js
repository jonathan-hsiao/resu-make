const { strategy: JWTStrategy } = require("./jwt");
const { strategy: GoogleStrategy } = require("./google");

module.exports = {
    JWTStrategy,
    GoogleStrategy
};