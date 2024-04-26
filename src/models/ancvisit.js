`CREATE TABLE ancvisit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    healthpersonnel_id INT,
    anc_number INT,
    lastANC INT,
    missed INT DEFAULT 0,
    attended INT DEFAULT 1,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
