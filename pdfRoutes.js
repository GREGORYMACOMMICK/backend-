const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");

// Route for generating PDF
router.get("/generate", pdfController.generatePDF);

module.exports = router;
