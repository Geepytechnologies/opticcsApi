function getExistingEmailQuery() {
  return `
      SELECT * FROM healthpersonnel
      WHERE email = ?
    `;
}

function getExistingUserQuery() {
  return `
      SELECT * FROM healthpersonnel
      WHERE email = ? AND phone = ?
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
function getAUserByPhone() {
  return `
      SELECT * FROM healthpersonnel WHERE phone = ?
    `;
}
function getUserPatients() {
  return `
  SELECT p.*
  FROM patients p
  WHERE p.healthpersonnel_id = ?;  
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

export class UserQueries {
  static getAllUsersNational(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersNationalCount() {
    return `SELECT count(*) as total FROM healthpersonnel`;
  }
  static getAllUsersNationalwithdate(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel AND DATE(createdat) BETWEEN ? AND ? ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersNationalwithdateCount() {
    return `SELECT count(*) FROM healthpersonnel AND DATE(createdat) BETWEEN ? AND ?`;
  }
  //state
  static getAllUsersState(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel WHERE state = ?  ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersStateCount() {
    return `SELECT count(*) as total FROM healthpersonnel WHERE state = ?`;
  }
  static getAllUsersStatewithdate(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel WHERE state = ? AND DATE(createdat) BETWEEN ? AND ? ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersStatewithdateCount() {
    return `SELECT count(*) FROM healthpersonnel WHERE state = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  //lga
  static getAllUsersLga(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel WHERE state = ? AND lga = ? ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersLgaCount() {
    return `SELECT count(*) as total FROM healthpersonnel WHERE state = ? AND lga = ?`;
  }
  static getAllUsersLgawithdate(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel WHERE state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ? ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersLgawithdateCount() {
    return `SELECT count(*) FROM healthpersonnel WHERE state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  //healthfacility
  static getAllUsersHealthfacility(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel WHERE state = ? AND halthfacility = ? ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersHealthfacilityCount() {
    return `SELECT count(*) as total FROM healthpersonnel WHERE state = ? AND healthfacility = ?`;
  }
  static getAllUsersHealthfacilitywithdate(pageSize: number, offset: number) {
    return `SELECT * FROM healthpersonnel WHERE state = ? AND halthfacility = ? AND DATE(createdat) BETWEEN ? AND ?  ORDER BY
    id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllUsersHealthfacilitywithdateCount() {
    return `SELECT count(*) FROM healthpersonnel WHERE state = ? AND healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
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
