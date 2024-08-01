const db = require("../config/db");

// Add a new drug
exports.addDrug = async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    await db.query(
      "INSERT INTO drugs (name, price, quantity) VALUES (?, ?, ?)",
      [name, price, quantity]
    );
    res.status(201).json({ message: "Drug added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all drugs
exports.getDrugs = async (req, res) => {
  try {
    const [drugs] = await db.query("SELECT * FROM drugs");
    res.json(drugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a drug
exports.updateDrug = async (req, res) => {
  const { id, name, price, quantity } = req.body;

  try {
    await db.query(
      "UPDATE drugs SET name = ?, price = ?, quantity = ? WHERE id = ?",
      [name, price, quantity, id]
    );
    res.json({ message: "Drug updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a drug
exports.deleteDrug = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM drugs WHERE id = ?", [id]);
    res.json({ message: "Drug deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
