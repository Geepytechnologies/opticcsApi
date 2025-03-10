`CREATE TABLE Enumerator (
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
);``CREATE TABLE EnumerationSettlements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    state VARCHAR(255) NOT NULL,
    lga VARCHAR(255) NOT NULL,
    ward VARCHAR(255) NOT NULL,
    settlement VARCHAR(255) NOT NULL,
    teamCode VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);``CREATE TABLE EnumerationData (
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
    longitude FLOAT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

);``CREATE TABLE EnumerationAncVisitData (
    id INT PRIMARY KEY AUTO_INCREMENT,
    anc VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    enumerationDataId INT,
    FOREIGN KEY (enumerationDataId) REFERENCES EnumerationData(id) ON DELETE CASCADE
);``CREATE TABLE EnumerationTTData (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    enumerationDataId INT,
    FOREIGN KEY (enumerationDataId) REFERENCES EnumerationData(id) ON DELETE CASCADE
);`;
