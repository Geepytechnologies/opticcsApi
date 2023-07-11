function getExistingEmailQuery(email) {
  return `
      SELECT * FROM healthpersonnel
      WHERE email = '${email}'
    `;
}

function getExistingUserQuery(email, phone) {
  return `
      SELECT * FROM healthpersonnel
      WHERE email = '${email}' AND phone = '${phone}'
    `;
}

function getExistingPhoneQuery(phone) {
  return `
      SELECT * FROM healthpersonnel
      WHERE phone = '${phone}'
    `;
}
function getAllUsers() {
  return `
      SELECT * FROM healthpersonnel
    `;
}
function getRefreshToken(refreshToken) {
  return `
      SELECT * FROM healthpersonnel WHERE refreshToken = '${refreshToken}'
    `;
}
function updateUserRefresh(email, refreshToken) {
  return `
  UPDATE healthpersonnel
  SET refreshToken = '${refreshToken}'
  WHERE email = '${email}'
    `;
}
function createUserQuery(
  name,
  email,
  hashedpassword,
  phone,
  state,
  lga,
  ward,
  healthFacility,
  healthWorker,
  cadre,
  accountType
) {
  return `
  INSERT INTO healthpersonnel (name,
    email,
    password,
    phone,
    state,
    lga,
    ward,
    healthFacility,
    healthWorker,
    cadre,
    accountType) 
  VALUES ('${name}','${email}', '${hashedpassword}', '${phone}', '${state}', '${lga}', '${ward}', '${healthFacility}','${healthWorker}','${cadre}','${accountType}')`;
}

module.exports = {
  getExistingEmailQuery,
  getExistingUserQuery,
  getExistingPhoneQuery,
  createUserQuery,
  getAllUsers,
  getRefreshToken,
  updateUserRefresh,
};
