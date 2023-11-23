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
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

(async () => {
  try {
    await db.query("SELECT 1");
    console.log("Connected to MySQL pool!");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error.message);
  }
})();

module.exports = db;
