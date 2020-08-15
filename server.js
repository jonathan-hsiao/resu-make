require("dotenv").config({ path:'./.env' });

const express = require("express");
const cors = require("cors");
const path = require("path");
const { urlencoded, json } = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const router = require("./router");
const db = require("./db");
const { initializeAuthentication } = require("./auth");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
const port = `${process.env.PORT}`;
app.use(urlencoded({extended: true}));
app.use(json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "client", "build")));
app.enable("trust proxy"); //heroku handles https, node never sees req.connection.encrypted so thinks it is undefined

router(app);
initializeAuthentication(app);

app.get("/", (req, res) => {
    res.status(200).json({ data: "API running" });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server started on port ${port}`));