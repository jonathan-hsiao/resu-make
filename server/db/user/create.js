const { User } = require("../schema");

const createUser = async ({
    email,
    password,
    providerId,
    provider
}) => {
    
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email });

        if (user) {
            return reject("Email is already in use.")
        }

        return resolve(
            await User.create({
                providerId,
                provider,
                email,
                password
            })
        );
    });
};

module.exports = {
    createUser
};