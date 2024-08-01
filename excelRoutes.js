const express = require("express");
const router = express.Router();
const excelController = require("../controllers/excelController");

// Route for exporting data to Excel
router.get("/export", excelController.exportToExcel);

module.exports = router;
