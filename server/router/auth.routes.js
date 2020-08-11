const express = require("express");
const { to } = require("await-to-js");
const { verifyPassword, hashPassword, verifyToken } = require("../auth/utils");
const { login } = require("../auth/strategies/jwt");
const { createUser, getUserByEmail, getUserById } = require("../db/user");
const jwt = require("../auth/strategies/jwt");
const { User } = require("../db/schema");

const router = express.Router();


router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    const authenticationError = (message) => {
        return res
            .status(500)
            .json({ success: false, data: `auth error: ${message}` })
    }

    const [err, user] = await to(getUserByEmail(email));

    if (!user) {
        return authenticationError("User not found")
    }

    if (err) {
        return authenticationError("Error finding user.")
    }

    if (!(await verifyPassword(password, user.password))) {
        return authenticationError("Incorrect password");
    }

    const userAuth = user;
    userAuth.resumes = null;
    const [loginErr, token] = await to(login(req, userAuth));

    if (loginErr) {
        console.error("Login error", loginErr);
        return authenticationError("Authentication error");
    }

    return res
        .status(200)
        .cookie("jwt", token, {
            httpOnly: true
        })
        .json({
            success: true, 
            data: "Successfully logged in user"
        });
});


router.get("/logout", async(req, res) => {
    req.logout();
    return res
        .status(200)
        .clearCookie("jwt", {
            httpOnly: true
        })
        .json({
            success: true,
            data: "Successfully logged out"
        })
});


router.post("/register", async(req, res) => {
    const { email, password } = req.body;
    
    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
        return res
            .status(500)
            .json({ success: false, data: "Enter a valid email address" })
    } else if (password.length < 8) {
        return res
            .status(500)
            .json({ success: false, data: "Password must be at least 8 characters" })
    }
    
    let [err, user] = await to(
        createUser({
            email,
            password: await hashPassword(password)
        })
    );

    if (err) {
        return res
            .status(500)
            .json({ success: false, data: "Email is already in use" })
    }

    const userAuth = user;
    userAuth.resumes = null;
    const [loginErr, token] = await to(login(req, userAuth));

    if (loginErr) {
        console.error("Login error", loginErr);
        return res
            .status(500)
            .json({ success: false, data: "Authentication error" })
    }

    return res
        .status(200)
        .cookie("jwt", token, {
            httpOnly: true
        })
        .json({ 
            success: true, 
            data: "Successfully registered user"
        });
});


router.get("/loadData", verifyToken, async(req, res) => {
    const [err, user] = await to(getUserById(req.userData._id));

    if (err) {
        return res.status(500).json({ success: false, data: "Error fetching user" });
    }

    return res
        .status(200)
        .json({
            success: true,
            data: user
    });
});


router.post("/saveData", verifyToken, async(req, res) => {
    const resumes = req.body.newResumes;

    const [err, user] = await to(getUserById(req.userData._id));

    if (err) {
        return res.status(500).json({ success: false, data: "Error fetching user" });
    }

    user.resumes = resumes;

    user.save(() => {
        return res
            .status(200)
            .json({ 
                success: true, 
                data: resumes
            });
    });

});

module.exports = router;