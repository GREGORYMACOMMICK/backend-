const xlsx = require("xlsx");
const validator = require("validator");
const db = require("../config/db");
const path = require("path");
const fs = require("fs");

// Import data from Excel file
exports.importData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Validate and insert data
    const errors = [];
    const validRecords = [];

    data.forEach((record, index) => {
      const { name, email, phone } = record;

      // Validate data
      if (!name || !email || !phone) {
        errors.push(`Missing information in record at index ${index}`);
        return;
      }
      if (!validator.isEmail(email)) {
        errors.push(`Invalid email address in record at index ${index}`);
        return;
      }
      if (!validator.isMobilePhone(phone, "any", { strictMode: false })) {
        errors.push(`Invalid phone number in record at index ${index}`);
        return;
      }

      validRecords.push({ name, email, phone });
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Insert valid data into the database
    const insertPromises = validRecords.map((record) =>
      db.query("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)", [
        record.name,
        record.email,
        record.phone,
      ])
    );

    await Promise.all(insertPromises);

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Data imported successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
