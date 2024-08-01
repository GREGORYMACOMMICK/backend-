const logger = (req, res, next) => {
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next(); // Pass control to the next middleware function
};

module.exports = logger;
