export class RequestingTestQuery {
  static requestingatest() {
    return `INSERT INTO requestedtest (healthpersonnel_id, testoption, patient_id) VALUES (?,?,?)`;
  }
  static getRequestedTestById() {
    return `SELECT * FROM requestedtest WHERE id = ?`;
  }
  static getrequestedtests() {
    return `SELECT
        requestedtest.*,
        personalinformation.firstname,
        personalinformation.surname
      FROM
        requestedtest
      JOIN
        patients ON requestedtest.patient_id = patients.id
      JOIN
        personalinformation ON patients.personalinformation_id = personalinformation.id;`;
  }
  static updaterequestedtest() {
    return `UPDATE requestedtest
        SET
          healthpersonnel_id = IFNULL(?,healthpersonnel_id),
          completed = IFNULL(?, completed),
          testoption = IFNULL(?, testoption),
          patient_id = IFNULL(?, patient_id)
        WHERE id = ?;`;
  }
}
