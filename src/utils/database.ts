import db from "../config/db";
import logger from "../logger";

const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const [rows] = await db.query(
      `SELECT 1 FROM information_schema.tables WHERE table_schema = ? AND table_name = ? LIMIT 1`,
      [process.env.MYSQLDATABASE, tableName]
    );
    // @ts-ignore
    return rows?.length > 0;
  } catch (error: any) {
    logger.error(`Error checking if table ${tableName} exists:`, error.message);
    return false;
  }
};

export const createTables = async () => {
  // Reorder tables to ensure parent tables are created first
  const tables = [
    "EnumerationData", // Parent table
    "Enumerator",
    "EnumerationSettlements",
    "EnumerationAncVisitData", // Child table (references EnumerationData)
    "EnumerationTTData", // Child table (references EnumerationData)
  ];

  for (const table of tables) {
    const tableExists = await checkTableExists(table);
    if (tableExists) {
      logger.info(`Table ${table} already exists. Skipping creation.`);
      continue;
    }

    // Add the CREATE TABLE statement for the specific table here
    let createTableQuery = "";
    switch (table) {
      case "Enumerator":
        createTableQuery = `
          CREATE TABLE Enumerator (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(255) UNIQUE NOT NULL,
            gender VARCHAR(255) NOT NULL,
            userID VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            lga VARCHAR(255) NOT NULL,
            ward VARCHAR(255) NOT NULL,
            settlement VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            isActive BOOLEAN DEFAULT TRUE,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
          );
        `;
        break;

      case "EnumerationData":
        createTableQuery = `
          CREATE TABLE EnumerationData (
            id INT PRIMARY KEY AUTO_INCREMENT,
            clientNumber VARCHAR(255) NOT NULL,
            firstName VARCHAR(255) NOT NULL,
            middleName VARCHAR(255),
            surName VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            alternatePhone VARCHAR(255),
            address VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            lga VARCHAR(255) NOT NULL,
            ward VARCHAR(255) NOT NULL,
            settlement VARCHAR(255) NOT NULL,
            servingHealthcareFacility VARCHAR(255) NOT NULL,
            gravidity VARCHAR(255) NOT NULL,
            parity VARCHAR(255) NOT NULL,
            lmp VARCHAR(255) NOT NULL,
            edd VARCHAR(255) NOT NULL,
            ega VARCHAR(255) NOT NULL,
            attendedAncVisit VARCHAR(255) NOT NULL,
            numberOfAncVisits INT,
            receivedTetanusVaccination VARCHAR(255) NOT NULL,
            latitude FLOAT,
            longitude FLOAT
          );
        `;
        break;

      case "EnumerationSettlements":
        createTableQuery = `
          CREATE TABLE EnumerationSettlements (
            id INT PRIMARY KEY AUTO_INCREMENT,
            state VARCHAR(255) NOT NULL,
            lga VARCHAR(255) NOT NULL,
            ward VARCHAR(255) NOT NULL,
            settlement VARCHAR(255) NOT NULL,
            teamCode VARCHAR(255) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `;
        break;

      case "EnumerationAncVisitData":
        createTableQuery = `
          CREATE TABLE EnumerationAncVisitData (
            id INT PRIMARY KEY AUTO_INCREMENT,
            anc VARCHAR(255) NOT NULL,
            date DATETIME NOT NULL,
            enumerationDataId INT,
            FOREIGN KEY (enumerationDataId) REFERENCES EnumerationData(id) ON DELETE CASCADE
          );
        `;
        break;

      case "EnumerationTTData":
        createTableQuery = `
          CREATE TABLE EnumerationTTData (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            date DATETIME NOT NULL,
            enumerationDataId INT,
            FOREIGN KEY (enumerationDataId) REFERENCES EnumerationData(id) ON DELETE CASCADE
          );
        `;
        break;

      default:
        logger.warn(`No CREATE TABLE query defined for table: ${table}`);
        continue;
    }

    try {
      await db.query(createTableQuery);
      logger.info(`Table ${table} created successfully!`);
    } catch (error: any) {
      logger.error(`Error creating table ${table}:`, error.message);
      console.error(error); // Log the full error for debugging
    }
  }
};
