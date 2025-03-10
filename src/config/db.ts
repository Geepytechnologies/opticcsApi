import mysql, { Pool } from "mysql2/promise";
import logger from "../logger";
import { createTables } from "../utils/database";

const connectionsInUse = new Set();

const db: Pool = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  port: Number(process.env.MYSQLPORT) || 3306,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "your_database_name",
  waitForConnections: true,
  connectionLimit: 60,
  maxIdle: 60, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  connectTimeout: 20000,
});

// Event listener for when a connection is acquired
db.on("acquire", function (connection) {
  connectionsInUse.add(connection.threadId);
  console.log(
    `Connection ${connection.threadId} acquired. Connections in use: ${connectionsInUse.size}`
  );
});

// Event listener for when a connection is released
db.on("release", function (connection) {
  connectionsInUse.delete(connection.threadId);
  console.log(
    `Connection ${connection.threadId} released. Connections in use: ${connectionsInUse.size}`
  );
});

(async () => {
  try {
    await db.query("SELECT 1");
    logger.info("Connected to MySQL pool! new config");
    //await createTables();
  } catch (error: any) {
    console.log(error);
    logger.error("Failed to connect to MySQL:", error.message);
  }
})();

export default db;
