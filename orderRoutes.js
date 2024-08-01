const express = require("express");
const router = express.Router();

// Sample controller function (you should replace this with your actual handler)
const createOrder = (req, res) => {
  // Your logic to create an order
  res.send("Order created");
};

// Define the POST route
router.post("/orders", createOrder);

module.exports = router;
