const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db"); // Ensure you have this file for DB connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const recordRoutes = require("./routes/records");
app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
