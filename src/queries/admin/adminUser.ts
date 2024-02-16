//@ts-nocheck
function getExistingEmailQuery(email) {
  return `
        SELECT * FROM healthadmin
        WHERE email = '${email}'
      `;
}

function getExistingUserQuery(email, phone) {
  return `
        SELECT * FROM healthadmin
        WHERE email = '${email}' AND phone = '${phone}'
      `;
}

function getExistingPhoneQuery(phone) {
  return `
        SELECT * FROM healthadmin
        WHERE phone = '${phone}'
      `;
}
function getAllUsers() {
  return `
        SELECT * FROM healthadmin
      `;
}
function getRefreshToken() {
  return `
        SELECT * FROM healthadmin WHERE refreshToken = '?'
      `;
}
function updateUserRefresh(email, refreshToken) {
  return `
    UPDATE healthadmin
    SET refreshToken = '${refreshToken}'
    WHERE email = '${email}'
      `;
}
function createUserQuery(
  firstname,
  lastname,
  email,
  password,
  phone,
  staffid,
  accountType
) {
  return `
    INSERT INTO healthadmin (
    firstname,
    lastname,
    email,
    password,
    phone,
    staffid,
    accountType) 
    VALUES ('${firstname}','${lastname}','${email}', '${password}', '${phone}', '${staffid}', '${accountType}')`;
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
