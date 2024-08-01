const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("./middlewares/logger");
const validateUser = require("./middlewares/validator");
// const errorHandler = require("./middlewares/errorHandler");
const recordRoutes = require("./routes/records");
const dataRoutes = require("./routes/dataRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const excelRoutes = require("./routes/excelRoutes");

const app = express();

// // Middleware
// const validateUser = (req, res, next) => {
//   // Add your user validation logic here
//   // Example: Check if user data is valid
//   if (!req.body.username || !req.body.password) {
//     return res
//       .status(400)
//       .json({ message: "Username and password are required" });
//   }
//   next();
// };

// const authenticate = (req, res, next) => {
//   // Add your authentication logic here
//   // Example: Check if user is authenticated
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }
//   // Verify token (this is just a placeholder)
//   // Verify token and set user info if valid
//   next();
// };

const errorHandler = (err, req, res, next) => {
  // Generic error handler
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
};

// Body parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define routes
app.post("/register", validateUser.validateRegister, (req, res) => {
  // Registration logic
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", validateUser.validateRegister, (req, res) => {
  // Login logic
  res.json({ message: "User logged in successfully" });
});

const authRoutes = require("./routes/authRoutes");
const drugRoutes = require("./routes/drugRoutes");
const orderRoutes = require("./routes/orderRoutes");

// // Apply authentication middleware to protected routes
app.use("/drugs", drugRoutes);
// app.use("/orders", orderRoutes);
app.use("/api/records", recordRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/data", dataRoutes);
app.use("/api/user", authRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/excel", excelRoutes);

// Simple GET request to test response
app.get("/api/data/get-sample", (req, res) => {
  res.json({ message: "This is a sample response from the server!" });
});

// Error handling middleware (should be the last middleware)
// app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
