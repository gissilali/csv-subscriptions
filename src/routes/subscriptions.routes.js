const express = require("express");
const {handleExport, handleDownload} = require("../controllers/subscriptionsController");
const router = express.Router();

router
    .get("/export", handleExport)
    .get('/download/:filename', handleDownload);

module.exports = router;
