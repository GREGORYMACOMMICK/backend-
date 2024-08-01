const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Create a new record
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO records (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all records with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const [records] = await db.query("SELECT * FROM records LIMIT ? OFFSET ?", [
      parseInt(limit),
      offset,
    ]);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single record by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [record] = await db.query("SELECT * FROM records WHERE id = ?", [id]);
    if (record.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a record by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE records SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ id, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a record by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM records WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
