const jwt = require("jsonwebtoken");

// Middleware to authenticate users
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from Authorization header

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded; // Attach user info to request
    next(); // Pass control to the next middleware function
  });
};

module.exports = authenticate;
