const mongoose = require("mongoose");

mongoose
    .connect(process.env.DB_CONNECTION_STRING || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(e => {
        console.error("Connection error", e.message);
    });

mongoose.set("useCreateIndex", true); //handle deprecation warning

const db = mongoose.connection;

module.exports = db;