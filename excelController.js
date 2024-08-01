const xlsx = require("xlsx");
const db = require("../config/db");
const path = require("path");
const fs = require("fs");

// Export data to Excel
exports.exportToExcel = async (req, res) => {
  try {
    // Fetch data from database
    const [data] = await db.query("SELECT * FROM users");

    // Prepare data for Excel
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

    // Generate Excel file
    const filePath = path.join(__dirname, "../uploads/users.xlsx");
    xlsx.writeFile(workbook, filePath);

    // Send the file to the user
    res.download(filePath, "users.xlsx", (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Clean up the generated file
        fs.unlinkSync(filePath);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
