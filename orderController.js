const db = require("../config/db");

// Create a new order
exports.createOrder = async (req, res) => {
  const { userId, drugId, quantity } = req.body;

  try {
    const [drug] = await db.query("SELECT * FROM drugs WHERE id = ?", [drugId]);

    if (drug.length === 0) {
      return res.status(404).json({ message: "Drug not found" });
    }

    if (drug[0].quantity < quantity) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }

    await db.query(
      "INSERT INTO orders (user_id, drug_id, quantity) VALUES (?, ?, ?)",
      [userId, drugId, quantity]
    );
    await db.query("UPDATE drugs SET quantity = quantity - ? WHERE id = ?", [
      quantity,
      drugId,
    ]);

    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const [orders] = await db.query("SELECT * FROM orders");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
