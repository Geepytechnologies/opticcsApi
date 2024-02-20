import mysql, { Pool } from "mysql2/promise";
import logger from "../logger";

const db: Pool = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  port: Number(process.env.MYSQLPORT) || 3306,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "your_database_name",
  waitForConnections: true,
  connectionLimit: 30,
  //maxIdle: 30, // max idle connections, the default value is the same as `connectionLimit`
  //idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  //queueLimit: 0,
  // enableKeepAlive: true,
  // keepAliveInitialDelay: 0,
});

// Event listener for when a connection is acquired
db.on("acquire", function (connection) {
  console.log("Connection %d acquired", connection.threadId);
});

// Event listener for when a connection is released
db.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

(async () => {
  try {
    await db.query("SELECT 1");
    logger.info("Connected to MySQL pool!");
  } catch (error: any) {
    logger.error("Failed to connect to MySQL:", error.message);
  }
})();

export default db;
