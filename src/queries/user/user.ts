function getExistingEmailQuery(email: string) {
  return `
      SELECT * FROM healthpersonnel
      WHERE email = '${email}'
    `;
}

function getExistingUserQuery(email: any, phone: any) {
  return `
      SELECT * FROM healthpersonnel
      WHERE email = :email AND phone = :phone
    `;
}

function getExistingPhoneQuery() {
  return `
      SELECT * FROM healthpersonnel
      WHERE phone = ?
    `;
}
function getAllUsers() {
  return `
      SELECT * FROM healthpersonnel
    `;
}
function getAUserByEmail() {
  return `
      SELECT * FROM healthpersonnel WHERE email = :email
    `;
}
function getAUserByPhone(phone: any) {
  return `
      SELECT * FROM healthpersonnel WHERE phone = :phone
    `;
}
function getUserPatients(id: any) {
  return `
  SELECT p.*
  FROM patients p
  WHERE p.healthpersonnel_id = :id;  
    `;
}
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

function getRefreshToken() {
  return `
      SELECT * FROM healthpersonnel WHERE refreshtoken = ?
    `;
}

function updateUserRefresh(email: any, refreshtoken: any) {
  return `
  UPDATE healthpersonnel
  SET refreshtoken = '${refreshtoken}'
  WHERE email = '${email}'
    `;
}
function patientRecordQuery(id: any) {
  return `
  SELECT *
FROM patients
LEFT JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
LEFT JOIN firstvisit ON patients.id = firstvisit.patient_id
WHERE patients.id = '${id}';
    `;
}
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

export {
  getExistingEmailQuery,
  getExistingUserQuery,
  getExistingPhoneQuery,
  createUserQuery,
  getAllUsers,
  getRefreshToken,
  updateUserRefresh,
  getAUserByEmail,
  getAUserByPhone,
  getUserPatients,
  createPatientPersonalInfoQuery,
  createPatientFirstvisitDailyhabitQuery,
  createPatientFirstvisitObstetricQuery,
  patientRecordQuery,
};
