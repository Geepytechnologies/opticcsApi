function getExistingEmailQuery(email) {
  return `
      SELECT * FROM healthpersonnel
      WHERE email = '${email}'
    `;
}

function getExistingUserQuery(email, phone) {
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
function getAUserByPhone(phone) {
  return `
      SELECT * FROM healthpersonnel WHERE phone = :phone
    `;
}
function getUserPatients(id) {
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
      gravidity,
      parity,
      lmp,
      edd,
      ega,
      doyoufeelthebabysmovement,
      doyouknowdateoffirtbabymovement,
      doyouknowdateoflastbabymovement
  ) 
  VALUES (
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?
  )`;
}
function createPatientFirstvisitDailyhabitQuery() {
  return `
  INSERT INTO dailyhabitsandlifestyle (
    firstvisit_id,
    doyousmoke,
    doyoudrinkalcohol,
    doyouuseharmfulsubstances,
    whodoyoulivewith,
    stoppedfromleavingthehouse,
    threatenedyourlife,
    abusedphysicallyorsexually
    ) 
  VALUES (?,?,?,?,?,?,?,?)`;
}
function createPatientFirstvisitObstetricQuery() {
  return `
  INSERT INTO obstetrichistory (
    firstvisit_id,
    convulsionduringapregnancy,
    caesareansection,
    tearsthroughsphincter,
    haemorrhage,
    Stillbirths,
    prematureDeliveries,
    lowbirthweightbabies,
    deadbabies,
    miscarriages,
    others
    ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
}

function getRefreshToken() {
  return `
      SELECT * FROM healthpersonnel WHERE refreshtoken = ?
    `;
}

function updateUserRefresh(email, refreshtoken) {
  return `
  UPDATE healthpersonnel
  SET refreshtoken = '${refreshtoken}'
  WHERE email = '${email}'
    `;
}
function patientRecordQuery(id) {
  return `
  SELECT *
FROM patients
LEFT JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
LEFT JOIN firstvisit ON patients.id = firstvisit.patient_id
LEFT JOIN dailyhabitsandlifestyle ON firstvisit.id = dailyhabitsandlifestyle.firstvisit_id
LEFT JOIN obstetrichistory ON firstvisit.id = obstetrichistory.firstvisit_id
LEFT JOIN medicationhistory ON firstvisit.id = medicationhistory.firstvisit_id
LEFT JOIN pulmonary ON medicationhistory.id = pulmonary.medicationhistory_id
LEFT JOIN cardiovascular ON medicationhistory.id = cardiovascular.medicationhistory_id
LEFT JOIN gastrointestinal ON medicationhistory.id = gastrointestinal.medicationhistory_id
LEFT JOIN urinary ON medicationhistory.id = urinary.medicationhistory_id
LEFT JOIN gynaecological ON medicationhistory.id = gynaecological.medicationhistory_id
LEFT JOIN drughistory ON medicationhistory.id = drughistory.medicationhistory_id
LEFT JOIN returnvisit ON patients.id = returnvisit.patient_id
LEFT JOIN facialExpression ON returnvisit.id = facialExpression.returnvisit_id
LEFT JOIN generalCleanliness ON returnvisit.id = generalCleanliness.returnvisit_id
LEFT JOIN herSkin ON returnvisit.id = herSkin.returnvisit_id
LEFT JOIN herConjunctiva ON returnvisit.id = herConjunctiva.returnvisit_id
LEFT JOIN sclera ON returnvisit.id = sclera.returnvisit_id
LEFT JOIN bloodpressure ON returnvisit.id = bloodpressure.returnvisit_id
LEFT JOIN adbominalExamination ON returnvisit.id = adbominalExamination.returnvisit_id
LEFT JOIN messages ON patients.healthpersonnel_id = messages.healthpersonnel_id
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
    healthFacility,
    healthWorker,
    cadre
    ) 
  VALUES (?, ?, ?, ?, ?, ?,?,?)`;
}

module.exports = {
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
