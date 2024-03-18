export class Patientqueries {
  static getAllPatientsAndHealthworker() {
    return `SELECT
        p.*,
        hp.*,
        pi.*,
        last_visits.last_visit
      FROM
        patients p
      LEFT JOIN
        healthpersonnel hp ON p.healthpersonnel_id = hp.id
      LEFT JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
      LEFT JOIN (
        SELECT patient_id, MAX(visit_date) AS last_visit
        FROM (
          SELECT patient_id, returnvisit_date AS visit_date FROM returnvisit
          UNION ALL
          SELECT patient_id, firstvisit_date AS visit_date FROM firstvisit
        ) AS combined_visits
        GROUP BY patient_id
      ) AS last_visits ON p.id = last_visits.patient_id;
      `;
  }
  static getPatientCount() {
    return `SELECT COUNT(*) AS patient_count FROM patients;
        `;
  }
  static getPatientByPhone() {
    return `SELECT * FROM personalinformation WHERE phone = ?`;
  }
  static patientpersonalrecord() {
    return `
    INSERT INTO personalinformation (
      hospitalnumber,
      firstname,
      middlename,
      surname,
      phone,
      address,
      state,
      dateofbirth,
      lga,
      healthfacility,
      gravidity,
      parity,
      alive,
      lmpknown,
      lmp,
      edd,
      ega,
      laborstarted,
      firstbabymovement,
      doyoufeelthebabysmovement,
      doyouknowdateoffirstbabymovement
    ) 
    VALUES (
      ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    )`;
  }
}
