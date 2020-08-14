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
const port = `${process.env.SERVER_PORT}`;
app.use(urlencoded({extended: true}));
app.use(json());
app.use(cookieParser());

app.use(passport.initialize());

router(app);
initializeAuthentication(app);

app.get("/", (req, res) => {
    res.status(200).json({ data: "API running" })
});

app.listen(port, () => console.log(`Server started on port ${port}`));