const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        email: String,
        password: String,
        providerId: String,
        provider: String,
        resumes: Object,
    }
);

const User = model("User", userSchema);

module.exports = {
    User
};