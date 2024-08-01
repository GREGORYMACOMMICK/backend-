// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ message: "Something went wrong" });
};

module.exports = errorHandler;
