const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const fileController = require("../controllers/fileController");

// Route for uploading and resizing an image
router.post("/upload", upload.single("file"), fileController.uploadImage);

module.exports = router;
