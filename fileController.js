const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const upload = require("../middleware/multer");

// Upload and resize image
exports.uploadImage = async (req, res) => {
  try {
    // Validate that a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Resize the image to 800x600
    const outputFilePath = path.join("uploads", "resized-" + req.file.filename);
    await sharp(filePath)
      .resize(800, 600) // Resize to 800x600
      .toFile(outputFilePath);

    // Optionally delete the original file
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({
        message: "File uploaded and resized successfully",
        filePath: outputFilePath,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
