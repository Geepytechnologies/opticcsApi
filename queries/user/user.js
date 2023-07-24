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
function createPatientPersonalInfoQuery(
  HospitalNumber,
  FirstName,
  middleName,
  surname,
  phone,
  Address,
  Gravidity,
  parity,
  LMP,
  EDD,
  EGA,
  DoYouFeelthebabysmovement,
  doyouknowdateoffirtbabymovement,
  doyouknowdateoflastbabymovement
) {
  return `
  INSERT INTO personalInformation (
    HospitalNumber,
    FirstName,
    middleName,
    surname,
    phone,
    Address,
    Gravidity,
    parity,
    LMP,
    EDD,
    EGA,
    DoYouFeelthebabysmovement,
    doyouknowdateoffirtbabymovement,
    doyouknowdateoflastbabymovement
  ) 
  VALUES (
    :HospitalNumber,
    :FirstName,
    :middleName,
    :surname,
    :phone,
    :Address,
    :Gravidity,
    :parity,
    :LMP,
    :EDD,
    :EGA,
    :DoYouFeelthebabysmovement,
    :doyouknowdateoffirtbabymovement,
    :doyouknowdateoflastbabymovement
  )`;
}
function createPatientFirstvisitDailyhabitQuery(
  firstVisit_id,
  Doyouworkoutsidethehome,
  Doyouwalklongdistances,
  durationofwalkingdistanceinminutes,
  heavyloads,
  sleephours,
  dailymealcount,
  mealinthelasttwodays,
  nonfoodsubstances,
  babylessthanayear,
  doYou,
  WhodoyouLivewith,
  Didanyoneever,
  frightened
) {
  return `
  INSERT INTO dailyHabitsAndLifestyle (
    firstVisit_id,
        Doyouworkoutsidethehome,
        Doyouwalklongdistances,
        durationofwalkingdistanceinminutes,
        heavyloads,
        sleephours,
        dailymealcount,
        mealinthelasttwodays,
        nonfoodsubstances,
        babylessthanayear,
        doYou,
        WhodoyouLivewith,
        Didanyoneever,
        frightened
    ) 
  VALUES (:firstVisit_id, :Doyouworkoutsidethehome, :Doyouwalklongdistances, :durationofwalkingdistanceinminutes, :heavyloads, :sleephours, :dailymealcount, :mealinthelasttwodays,:nonfoodsubstances, :babylessthanayear, :doYou, :WhodoyouLivewith, :Didanyoneever, :frightened)`;
}
function createPatientFirstvisitObstetricQuery(
  firstVisit_id,
  convulsionduringapregnancy,
  caesareansection,
  tearsthroughsphincter,
  haemorrhage,
  Stillbirths,
  prematureDeliveries,
  lowbirthweightbabies,
  deadbabies,
  others1,
  breastfedbefore,
  durationyoubreastfedyourbaby,
  breastfeedingproblems,
  others2
) {
  return `
  INSERT INTO obstetricHistory (
    firstVisit_id,
    convulsionduringapregnancy,
    caesareansection,
    tearsthroughsphincter,
    haemorrhage,
    Stillbirths,
    prematureDeliveries,
    lowbirthweightbabies,
    deadbabies,
    others1,
    breastfedbefore,
    durationyoubreastfedyourbaby,
    breastfeedingproblems,
    others2
    ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
}

function getRefreshToken() {
  return `
      SELECT * FROM healthpersonnel WHERE refreshToken = ?
    `;
}

function updateUserRefresh(email, refreshToken) {
  return `
  UPDATE healthpersonnel
  SET refreshToken = '${refreshToken}'
  WHERE email = '${email}'
    `;
}
function patientRecordQuery(id) {
  return `
  SELECT *
FROM patients
LEFT JOIN personalInformation ON patients.personalInformation_id = personalInformation.id
LEFT JOIN firstVisit ON patients.id = firstVisit.patient_id
LEFT JOIN dailyHabitsAndLifestyle ON firstVisit.id = dailyHabitsAndLifestyle.firstVisit_id
LEFT JOIN obstetricHistory ON firstVisit.id = obstetricHistory.firstVisit_id
LEFT JOIN medicationHistory ON firstVisit.id = medicationHistory.firstVisit_id
LEFT JOIN pulmonary ON medicationHistory.id = pulmonary.medicationHistory_id
LEFT JOIN cardiovascular ON medicationHistory.id = cardiovascular.medicationHistory_id
LEFT JOIN neurologic ON medicationHistory.id = neurologic.medicationHistory_id
LEFT JOIN gastrointestinal ON medicationHistory.id = gastrointestinal.medicationHistory_id
LEFT JOIN urinary ON medicationHistory.id = urinary.medicationHistory_id
LEFT JOIN gynaecological ON medicationHistory.id = gynaecological.medicationHistory_id
LEFT JOIN historyof ON medicationHistory.id = historyof.medicationHistory_id
LEFT JOIN diagnosedof ON medicationHistory.id = diagnosedof.medicationHistory_id
LEFT JOIN onmedications ON medicationHistory.id = onmedications.medicationHistory_id
LEFT JOIN everyVisit ON patients.id = everyVisit.patient_id
LEFT JOIN facialExpression ON everyVisit.id = facialExpression.everyVisit_id
LEFT JOIN generalCleanliness ON everyVisit.id = generalCleanliness.everyVisit_id
LEFT JOIN herSkin ON everyVisit.id = herSkin.everyVisit_id
LEFT JOIN herConjunctiva ON everyVisit.id = herConjunctiva.everyVisit_id
LEFT JOIN sclera ON everyVisit.id = sclera.everyVisit_id
LEFT JOIN bloodpressure ON everyVisit.id = bloodpressure.everyVisit_id
LEFT JOIN adbominalExamination ON everyVisit.id = adbominalExamination.everyVisit_id
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
    cadre_id
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
