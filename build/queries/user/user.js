"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRecordQuery = exports.createPatientFirstvisitObstetricQuery = exports.createPatientFirstvisitDailyhabitQuery = exports.createPatientPersonalInfoQuery = exports.getUserPatients = exports.getAUserByPhone = exports.getAUserByEmail = exports.updateUserRefresh = exports.getRefreshToken = exports.getAllUsers = exports.createUserQuery = exports.getExistingPhoneQuery = exports.getExistingUserQuery = exports.getExistingEmailQuery = void 0;
function getExistingEmailQuery(email) {
    return `
      SELECT * FROM healthpersonnel
      WHERE email = '${email}'
    `;
}
exports.getExistingEmailQuery = getExistingEmailQuery;
function getExistingUserQuery(email, phone) {
    return `
      SELECT * FROM healthpersonnel
      WHERE email = :email AND phone = :phone
    `;
}
exports.getExistingUserQuery = getExistingUserQuery;
function getExistingPhoneQuery() {
    return `
      SELECT * FROM healthpersonnel
      WHERE phone = ?
    `;
}
exports.getExistingPhoneQuery = getExistingPhoneQuery;
function getAllUsers() {
    return `
      SELECT * FROM healthpersonnel
    `;
}
exports.getAllUsers = getAllUsers;
function getAUserByEmail() {
    return `
      SELECT * FROM healthpersonnel WHERE email = :email
    `;
}
exports.getAUserByEmail = getAUserByEmail;
function getAUserByPhone(phone) {
    return `
      SELECT * FROM healthpersonnel WHERE phone = :phone
    `;
}
exports.getAUserByPhone = getAUserByPhone;
function getUserPatients(id) {
    return `
  SELECT p.*
  FROM patients p
  WHERE p.healthpersonnel_id = :id;  
    `;
}
exports.getUserPatients = getUserPatients;
function createPatientPersonalInfoQuery() {
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
    doyouknowdateoffirstbabymovement,
    lastmonthseenperiod
  ) 
  VALUES (
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
  )`;
}
exports.createPatientPersonalInfoQuery = createPatientPersonalInfoQuery;
function createPatientFirstvisitDailyhabitQuery() {
    return `
  INSERT INTO dailyhabitsandlifestyle (
    firstvisit_id,
    doyou,
    whodoyoulivewith,
    specifywhodoyoulivewith,
    didanyoneever
    ) 
  VALUES (?,?,?,?,?)`;
}
exports.createPatientFirstvisitDailyhabitQuery = createPatientFirstvisitDailyhabitQuery;
function createPatientFirstvisitObstetricQuery() {
    return `
  INSERT INTO obstetrichistory (
    firstvisit_id,
    convulsionsduringpregnancy,
    caesarean,
    tearsthroughsphincter,
    postpartiumhaemorrghage,
    stillbirths,
    prematuredeliveries,
    lowbirthbabies,
    babieswhodied,
    miscarriages,
    otherinputobstetrichistory,
    yearofpregnancy,
    carriedtoterm,
    modeofdelivery,
    weightofbaby,
    sexofbaby,
    babycriedafterbirth,
    complicationsafterdelivery,
    specifycomplicationsafterdelivery,
    breastfedexclusively
    ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`;
}
exports.createPatientFirstvisitObstetricQuery = createPatientFirstvisitObstetricQuery;
function getRefreshToken() {
    return `
      SELECT * FROM healthpersonnel WHERE refreshtoken = ?
    `;
}
exports.getRefreshToken = getRefreshToken;
function updateUserRefresh(email, refreshtoken) {
    return `
  UPDATE healthpersonnel
  SET refreshtoken = '${refreshtoken}'
  WHERE email = '${email}'
    `;
}
exports.updateUserRefresh = updateUserRefresh;
function patientRecordQuery(id) {
    return `
  SELECT *
FROM patients
LEFT JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
LEFT JOIN firstvisit ON patients.id = firstvisit.patient_id
WHERE patients.id = '${id}';
    `;
}
exports.patientRecordQuery = patientRecordQuery;
function createUserQuery() {
    return `
  INSERT INTO healthpersonnel (
    password,
    phone,
    state,
    lga,
    ward,
    healthfacility,
    healthworker,
    cadre
    ) 
  VALUES (?, ?, ?, ?, ?, ?,?,?)`;
}
exports.createUserQuery = createUserQuery;
