const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log(`Request received at ${new Date()}`);
    next();
});

router.get("/", (req, res) => {
    res.json({
        message: "Hi from /api/!",
    });
    res.send();
});

router.post("/", (req, res) => {
    console.log(req.body);
    const testData = {
        Quiz: "What's your favorite letter?\nA)\nB)\nC)\nD)",
    };
    res.send(testData);
});

module.exports = router;
