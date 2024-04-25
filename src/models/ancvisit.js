`CREATE TABLE ancvisit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    healthpersonnel_id INT,
    anc_number INT,
    lastANC INT,
    missed BOOLEAN DEFAULT FALSE,
    attended BOOLEAN DEFAULT FALSE,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
