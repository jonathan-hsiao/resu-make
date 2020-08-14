const express = require("express");

const router = express.Router();

router.get("/getServerApiUrl", async(req, res) => {
    return res
        .status(200)
        .json({
            success: true,
            data: `${process.env.SERVER_API_URL}`
        })
});

router.get("/getBaseApiUrl", async(req, res) => {
    return res
        .status(200)
        .json({
            success: true,
            data: `${process.env.BASE_API_URL}`
        })
});

module.exports = router;