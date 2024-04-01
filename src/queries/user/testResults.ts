export class TestResultQueries {
  static createTest() {
    return `INSERT INTO testresult (
            healthpersonnel_id,
            requestedtest_id,
            hb,
            wcc,
            rcc,
            pcv,
            mcv,
            platelet,
            glucose,
            hiv,
            hepatitis,
            patient_id,
            rdt,
            bodytemp,
            heartrate,
            respiratoryrate,
            bodypressure,
            malariarapid,
            leukocytes,
            nitrites,
            urobilinogen,
            protein,
            pH,
            blood,
            specificgravity,
            ketones,
            bilirubin,
            glucoseUrinary,
            neutrophils,
            lymphocytes,
            monocytes,
            eosinophils,
            basophils,
            Haematocrit,
            mch,
            reticulocytecount,
            hbsag,
            hcv
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  }
  static getATestById() {
    return `SELECT * FROM testresult where id = ?`;
  }
  static getAPatientsTest() {
    return `SELECT * FROM testresult WHERE patient_id = ?`;
  }
  static getAllTests() {
    return `SELECT 
        testresult.*,
        personalinformation.firstname,
        personalinformation.surname
      FROM
        testresult
      JOIN
        patients ON testresult.patient_id = patients.id
      JOIN
        personalinformation ON patients.personalinformation_id = personalinformation.id;`;
  }
  static getATestByAUser() {
    return `SELECT * FROM testresult WHERE id = ? AND patient_id = ?`;
  }
  static updateTest() {
    return `UPDATE testresult
        SET
          healthpersonnel_id = IFNULL(?,healthpersonnel_id),
          hb = IFNULL(?, hb),
          wcc = IFNULL(?, wcc),
          rcc = IFNULL(?, rcc),
          pcv = IFNULL(?, pcv),
          mcv = IFNULL(?, mcv),
          platelet = IFNULL(?, platelet),
          glucose = IFNULL(?, glucose),
          hiv = IFNULL(?, hiv),
          hepatitis = IFNULL(?, hepatitis),
          rdt = IFNULL(?, rdt)
        WHERE id = ?`;
  }
}
