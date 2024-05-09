"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthFacilityRepository = void 0;
const logger_1 = __importDefault(require("../logger"));
const healthfacility_1 = require("../queries/admin/healthfacility");
class HealthFacilityRepository {
    constructor(connection) {
        this.connection = connection;
    }
    checkIfAccountExists(healthfacilityID) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityaccount WHERE healthfacilityID =?`;
            try {
                let checked;
                const result = yield this.connection.execute(q, [healthfacilityID]);
                if (Array.isArray(result[0])) {
                    if (result[0].length) {
                        checked = true;
                    }
                    else {
                        checked = false;
                    }
                }
                return checked;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                this.connection.release();
            }
        });
    }
    checkIfUserAccountExists(userID, hashedpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityadmin WHERE userid = ? AND password = ?`;
            try {
                let checked;
                const result = yield this.connection.execute(q, [userID, hashedpassword]);
                if (Array.isArray(result[0])) {
                    if (result[0].length) {
                        checked = true;
                    }
                    else {
                        checked = false;
                    }
                }
                return checked;
            }
            catch (error) {
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    createHealthFacilityAccount(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `INSERT INTO healthfacilityaccount (ward, healthfacilityname, lga, state, healthfacilityID, officeaddress, phone, email)
    VALUES (?, ?, ?, ?, ?, ?,?,?)`;
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    createHealthFacilityUserAccount(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `INSERT INTO healthfacilityadmin (ward, staffname,staffid, gender,lga, state, cadre, phone, email,userid ,password,healthfacility)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getHealthFacilityUserAccountUsingStateAndLga(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityaccount WHERE state = ? AND lga = ?`;
            try {
                const result = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getHealthFacilityAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityaccount`;
            try {
                const result = yield this.connection.execute(q);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getAllHealthfacilityNational(pageSize, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityNational(pageSize, offset);
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityNationalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityNationalCount();
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityNationalwithdate(pageSize, offset, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityNationalwithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityNationalwithdateCount(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityNationalwithdateCount();
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityState(pageSize, offset, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityState(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityStateCount(state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityStateCount();
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityStatewithdate(pageSize, offset, state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityStatewithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityStatewithdateCount(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityStatewithdateCount();
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityLga(pageSize, offset, state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityLga(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityLgaCount(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityLgaCount();
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityLgawithdate(pageSize, offset, state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityLgawithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllHealthfacilityLgawithdateCount(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = healthfacility_1.HealthfacilityQueries.getAllHealthfacilityLgawithdateCount();
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getHealthFacilityAccountsForLGA(lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityaccount WHERE lga = ?`;
            try {
                const result = yield this.connection.execute(q, [lga]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getHealthfacilityUserAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityadmin ORDER BY createdat DESC`;
            try {
                const result = yield this.connection.execute(q);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getHealthfacilityUserAccountByUserID(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityadmin WHERE userid = ?`;
            try {
                const result = yield this.connection.execute(q, [username]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getHealthfacilityUserAccountByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityadmin WHERE id = ?`;
            try {
                const result = yield this.connection.execute(q, [id]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    UpdateUserRefreshToken(refreshtoken, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `UPDATE healthfacilityadmin
    SET refreshtoken = ?
    WHERE userid = ?`;
            try {
                const result = yield this.connection.execute(q, [refreshtoken, userid]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    UpdateUserPassword(password, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `UPDATE healthfacilityadmin
    SET password = ?
    WHERE id = ?`;
            try {
                const result = yield this.connection.execute(q, [password, userid]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getUserWithRefreshToken(refreshtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM healthfacilityadmin WHERE refreshToken = ?`;
            try {
                const result = yield this.connection.execute(q, [refreshtoken]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    //data queries
    graviditygreaterthan8(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND healthfacility = ?`;
                const result = yield this.connection.execute(q, [healthfacility]);
                if (Array.isArray(result[0])) {
                    return result[0].length;
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    graviditylessthan8(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) < 8 AND healthfacility = ?`;
                const result = yield this.connection.execute(q, [healthfacility]);
                if (Array.isArray(result[0])) {
                    return result[0].length;
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getedd() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT 
        quarter,
        COUNT(*) AS number
      FROM (
        SELECT 
          edd,
          CASE 
            WHEN MONTH(edd) BETWEEN 1 AND 3 THEN 'Q1'
            WHEN MONTH(edd) BETWEEN 4 AND 6 THEN 'Q2'
            WHEN MONTH(edd) BETWEEN 7 AND 9 THEN 'Q3'
            WHEN MONTH(edd) BETWEEN 10 AND 12 THEN 'Q4'
          END AS quarter,
          healthfacility,healthfacility,healthFacility
        FROM personalinformation
      ) AS subquery
      GROUP BY quarter
      ORDER BY MIN(edd);  
      
    `;
                const result = yield this.connection.execute(q);
                // res.status(200).json(result[0]);
            }
            catch (error) {
                // res.status(500).json(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getedd2(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT 
      quarters.quarter,
      COUNT(subquery.quarter) AS number
    FROM (
      SELECT 'Q1' AS quarter
      UNION ALL SELECT 'Q2'
      UNION ALL SELECT 'Q3'
      UNION ALL SELECT 'Q4'
    ) AS quarters
    LEFT JOIN (
      SELECT 
        edd,
        CASE 
          WHEN MONTH(edd) BETWEEN 1 AND 3 THEN 'Q1'
          WHEN MONTH(edd) BETWEEN 4 AND 6 THEN 'Q2'
          WHEN MONTH(edd) BETWEEN 7 AND 9 THEN 'Q3'
          WHEN MONTH(edd) BETWEEN 10 AND 12 THEN 'Q4'
        END AS quarter,
        healthfacility
      FROM personalinformation WHERE healthfacility = ?
    ) AS subquery ON quarters.quarter = subquery.quarter
    GROUP BY quarters.quarter
    ORDER BY MIN(subquery.edd);
    
      
    `;
                const result = yield this.connection.execute(q, [healthfacility]);
                return result[0];
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getparity(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q1 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) <= 24 AND healthfacility = ?;
    `;
                const q2 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) > 24 AND healthfacility = ?;
    `;
                const less = yield this.connection.execute(q1, [healthfacility]);
                const greater = yield this.connection.execute(q2, [healthfacility]);
                if (Array.isArray(greater[0]) && Array.isArray(less[0])) {
                    return { less: less[0].length, greater: greater[0].length };
                }
            }
            catch (error) {
                this.connection.rollback();
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getbabysmovement(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q1 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
                const q2 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
                const q3 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? ANd healthfacility = ?;
    `;
                const q4 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
                const yes = yield this.connection.execute(q1, ["yes", healthfacility]);
                const no = yield this.connection.execute(q2, ["no", healthfacility]);
                const dontknow = yield this.connection.execute(q3, [
                    "i don't know",
                    healthfacility,
                ]);
                const notapplicable = yield this.connection.execute(q4, [
                    "not applicable",
                    healthfacility,
                ]);
                if (Array.isArray(yes[0]) &&
                    Array.isArray(no[0]) &&
                    Array.isArray(dontknow[0]) &&
                    Array.isArray(notapplicable[0])) {
                    return {
                        yes: yes[0].length,
                        no: no[0].length,
                        dontknow: dontknow[0].length,
                        notapplicable: notapplicable[0].length,
                    };
                }
            }
            catch (error) {
                this.connection.rollback();
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getfirstbabymovement(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q1 = `SELECT *
        FROM personalinformation
        WHERE doyouknowdateoffirtbabymovement = ? AND healthfacility = ?;
    `;
                const q2 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
                const q3 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
                const q4 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
                const yes = yield this.connection.execute(q1, ["yes", healthfacility]);
                const no = yield this.connection.execute(q2, ["no", healthfacility]);
                const dontknow = yield this.connection.execute(q3, [
                    "i don't know",
                    healthfacility,
                ]);
                const notapplicable = yield this.connection.execute(q4, [
                    "not applicable",
                    healthfacility,
                ]);
                if (Array.isArray(yes[0]) &&
                    Array.isArray(no[0]) &&
                    Array.isArray(dontknow[0]) &&
                    Array.isArray(notapplicable[0])) {
                    return {
                        yes: yes[0].length,
                        no: no[0].length,
                        dontknow: dontknow[0].length,
                        notapplicable: notapplicable[0].length,
                    };
                }
            }
            catch (error) {
                this.connection.rollback();
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getconvulsions(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.convulsionsduringpregnancy = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.convulsionsduringpregnancy = ?
      AND pi.healthfacility = ?`;
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getsurgery(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.caesarean = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.caesarean = ?
      AND pi.healthfacility = ?`;
                const result2 = yield this.connection.execute(q2, [
                    "yes",
                    healthfacility,
                ]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    gettearsthroughsphincter(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.tearsthroughsphincter = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.tearsthroughsphincter = ?
      AND pi.healthfacility = ?`;
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getpostpartiumhaemorrghage(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.postpartiumhaemorrghage = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.postpartiumhaemorrghage = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getstillbirths(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.stillbirths = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.stillbirths = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getprematuredeliveries(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.prematuredeliveries = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.prematuredeliveries = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getlowbirthbabies(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.lowbirthbabies = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.lowbirthbabies = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getbabieswhodied(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.babieswhodied = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.babieswhodied = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getmiscarriages(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.miscarriages = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.miscarriages = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    //dailyhabits and lifestyle
    getSmokers(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
  dailyhabitsandlifestyle dh
  JOIN
      firstvisit fv ON dh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      dh.doyousmoke = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
  dailyhabitsandlifestyle dh
  JOIN
      firstvisit fv ON dh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      dh.doyousmoke = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getAlcohol(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.doyoudrinkalcohol = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.doyoudrinkalcohol = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getThreatened(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.threatenedyourlife = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.threatenedyourlife = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["no", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    whodoyoulivewith(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
                const q3 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
                const q4 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
                const q5 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.specifywhodoyoulivewith IS NOT NULL
      AND pi.healthfacility = ? AND specifywhodoyoulivewith <> '';`;
                const result = yield this.connection.execute(q, [
                    "Partner",
                    healthfacility,
                ]);
                const result2 = yield this.connection.execute(q2, [
                    "Relative",
                    healthfacility,
                ]);
                const result3 = yield this.connection.execute(q3, [
                    "Alone",
                    healthfacility,
                ]);
                const result4 = yield this.connection.execute(q4, [
                    "Friend",
                    healthfacility,
                ]);
                const result5 = yield this.connection.execute(q5, [healthfacility]);
                if (Array.isArray(result5[0]) &&
                    Array.isArray(result[0]) &&
                    Array.isArray(result2[0]) &&
                    Array.isArray(result3[0]) &&
                    Array.isArray(result4[0])) {
                    return {
                        partner: result[0].length,
                        relative: result2[0].length,
                        alone: result3[0].length,
                        friend: result4[0].length,
                        others: result5[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    //medicalhistory
    getcough(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.cough = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.cough = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
                    return { yes: result[0].length, no: result2[0].length };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getpalpitations(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.palpitations = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.palpitations = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getdifficultybreathing(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.difficultybreathing = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.difficultybreathing = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getswellingoffeet(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.swellingfeet = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.swellingfeet = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getchestpain(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severechestpain = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severechestpain = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getepigastricpain(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeepigastricpain = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeepigastricpain = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getseveretiredness(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severetiredness = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severetiredness = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getsevereabdominalpain(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeabdominalpain = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeabdominalpain = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getpersistentvomiting(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentvomiting = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentvomiting = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getseverediarrhoea(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severediarrhoea = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severediarrhoea = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    //urinary
    getpainwithurination(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.painwithurination = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.painwithurination = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getsevereflankpain(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeflankpain = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeflankpain = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getbloodinurine(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.bloodinurine = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.bloodinurine = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    //gynaelogical
    getvaginaldischarge(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.vaginaldischarge = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.vaginaldischarge = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getdeeppelvicpain(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.deeppelvicpain = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.deeppelvicpain = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getsyphilis(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.syphilis = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.syphilis = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getpersistentdrycough(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentdrycough = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentdrycough = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getprogressiveweightloss(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.progressiveweightloss = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.progressiveweightloss = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getnightsweats(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.nightsweats = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.nightsweats = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getdiagnosedwithtuberculosis(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.diagnosedwithtuberculosis = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.diagnosedwithtuberculosis = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    gettreatedTBpreviously(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.treatedTBpreviously = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.treatedTBpreviously = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    //pastmedicalhistory
    getheartdisease(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.heartdisease = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.heartdisease = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getanaemia(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.anaemia = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.anaemia = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getkidneydisease(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.kidneydisease = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.kidneydisease = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getsicklecell(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.sicklecell = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.sicklecell = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getdiabetes(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.diabetes = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.diabetes = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getgoitre(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.goitre = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.goitre = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    gethivaids(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hivaids = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hivaids = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getotherseriouschronicillnesses(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.otherseriouschronicillnesses = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.otherseriouschronicillnesses = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    gethadsurgery(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hadsurgery = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hadsurgery = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    //drug history
    getherbalremedies(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.herbalremedies = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.herbalremedies = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getotcdrugs(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.otcdrugs = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.otcdrugs = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getvitamins(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.vitamins = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECd
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.vitamins = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getdietarysupplements(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.dietarysupplements = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.dietarysupplements = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    gettetanus(healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.tetanus = ?
      AND pi.healthfacility = ?`;
                const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.tetanus = ?
      AND pi.healthfacility = ?`;
                const result = yield this.connection.execute(q, ["Yes", healthfacility]);
                const result2 = yield this.connection.execute(q2, ["No", healthfacility]);
                if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
                    return {
                        yes: result[0].length,
                        no: result2[0].length,
                    };
                }
            }
            catch (error) {
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
}
exports.HealthFacilityRepository = HealthFacilityRepository;
