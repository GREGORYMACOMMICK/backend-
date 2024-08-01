const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const dataController = require("../controllers/dataController");

// Route for importing data from Excel file
router.post("/import", upload.single("file"), dataController.importData);

module.exports = router;
