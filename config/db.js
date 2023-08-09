const mysql = require("mysql2/promise");
const path = require("path");
const fs = require("fs");
const certificatePath = "../opticcs-ca-certificate.crt";

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  connectionLimit: 30, // Adjust the limit based on your application's needs
});

// No need for db.connect() as connection is managed by the db
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("Connected to MySQL pool!");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error.message);
  }
})();

module.exports = db;

// module.exports = db;
