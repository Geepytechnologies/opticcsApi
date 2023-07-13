// This is a combined controller for the patients

const db = require("../../config/db");
const {
  createPatientPersonalInfoQuery,
  patientRecordQuery,
} = require("../../queries/user/user");

const createPatient = async (req, res, next) => {
  const {
    healthpersonnel_id,
    firstVisit_date,
    HospitalNumber,
    FirstName,
    middleName,
    surname,
    Address,
    Gravidity,
    parity,
    LMP,
    EDD,
    EGA,
    DoYouFeelthebabysmovement,
    doyouknowdateoffirtbabymovement,
    doyouknowdateoflastbabymovement,
  } = req.body;

  const personalRecord = () => {
    return new Promise((resolve, reject) => {
      db.query(
        createPatientPersonalInfoQuery(
          HospitalNumber,
          FirstName,
          middleName,
          surname,
          Address,
          Gravidity,
          parity,
          LMP,
          EDD,
          EGA,
          DoYouFeelthebabysmovement,
          doyouknowdateoffirtbabymovement,
          doyouknowdateoflastbabymovement
        ),
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            const user = result;
            resolve(user);
          }
        }
      );
    });
  };
  const createpatient = (personalInformation_id) => {
    const createPatientQuery = `INSERT INTO patients (healthpersonnel_id,firstVisit_date, personalInformation_id)
    VALUES ('${healthpersonnel_id}','${firstVisit_date}', '${personalInformation_id}')`;
    return new Promise((resolve, reject) => {
      db.query(createPatientQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createfirstvisit = (patient_id) => {
    const createFirstVisitQuery = `INSERT INTO firstVisit (patient_id, createdAt) VALUES ('${patient_id}','${firstVisit_date}')`;
    return new Promise((resolve, reject) => {
      db.query(createFirstVisitQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };

  //create patient personal record
  try {
    const createdrecord = await personalRecord();
    const personalInformation_id = createdrecord.insertId;
    const patientcreate = await createpatient(personalInformation_id);
    const patientID = patientcreate.insertId;
    const firstvisitcreation = await createfirstvisit(patientID);
    const firstvisitID = firstvisitcreation.insertId;
    res.status(201).json({
      personalInformation_id: personalInformation_id,
      patientID: patientID,
      firstvisitID: firstvisitID,
    });
  } catch (err) {
    console.error(err);
  }
};

const getPatientRecord = async (req, res) => {
  const { id } = req.params;
  const record = () => {
    return new Promise((resolve, reject) => {
      db.query(patientRecordQuery(id), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  try {
    const response = await record();
    res.status(200).json(response);
  } catch (err) {}
};

module.exports = { createPatient, getPatientRecord };
