const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL)
router.get("/", (req, res) => {
    res.send("URL route is working");
});

router.get('/analytics/:shortID', handleGetAnalytics)
module.exports = router;