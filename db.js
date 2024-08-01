const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "yourUsername",
  password: "yourPassword",
  database: "yourDatabase",
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

module.exports = promisePool;
