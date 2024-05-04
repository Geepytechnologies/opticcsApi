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
exports.getAllHealthfacility = exports.healthfacilitytestdata = exports.healthfacilityreturnvisitdata = exports.healthfacilityscheduledata = exports.numberofwomenwith4visits = exports.healthfacilitygeneraldata = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const logger_1 = __importDefault(require("../../../logger"));
const numberofwomenwith4visits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { healthfacility } = req.query;
    try {
        const q = `SELECT COUNT(*) AS patient_count
    FROM patients p
    LEFT JOIN (
        SELECT patient_id, COUNT(*) AS first_visit_count
        FROM firstvisit
        GROUP BY patient_id
    ) fv ON p.id = fv.patient_id
    LEFT JOIN (
        SELECT patient_id, COUNT(*) AS return_visit_count
        FROM returnvisit
        GROUP BY patient_id
    ) ev ON p.id = ev.patient_id
    LEFT JOIN healthpersonnel hp ON p.healthpersonnel_id = hp.id
    WHERE (COALESCE(fv.first_visit_count, 0) + COALESCE(ev.return_visit_count, 0)) > 4
    AND hp.healthfacility = ?
        
      `;
        const result = yield connection.execute(q, [healthfacility]);
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.numberofwomenwith4visits = numberofwomenwith4visits;
const graviditygreaterthan8 = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND healthfacility = ?`;
        const result = yield connection.execute(q, [healthfacility]);
        return result[0].length;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const graviditylessthan8 = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8 AND healthfacility = ?`;
        const result = yield connection.execute(q, [healthfacility]);
        return result[0].length;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getedd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q);
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getedd2 = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, [healthfacility]);
        return result[0];
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getparity = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) <= 24 AND healthfacility = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) > 24 AND healthfacility = ?;
  `;
        const less = yield connection.execute(q1, [healthfacility]);
        const greater = yield connection.execute(q2, [healthfacility]);
        return { less: less[0].length, greater: greater[0].length };
    }
    catch (error) {
        connection.rollback();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getbabysmovement = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const yes = yield connection.execute(q1, ["yes", healthfacility]);
        const no = yield connection.execute(q2, ["no", healthfacility]);
        const dontknow = yield connection.execute(q3, [
            "i don't know",
            healthfacility,
        ]);
        const notapplicable = yield connection.execute(q4, [
            "not applicable",
            healthfacility,
        ]);
        return {
            yes: yes[0].length,
            no: no[0].length,
            dontknow: dontknow[0].length,
            notapplicable: notapplicable[0].length,
        };
    }
    catch (error) {
        connection.rollback();
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getfirstbabymovement = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const yes = yield connection.execute(q1, ["yes", healthfacility]);
        const no = yield connection.execute(q2, ["no", healthfacility]);
        const dontknow = yield connection.execute(q3, [
            "i don't know",
            healthfacility,
        ]);
        const notapplicable = yield connection.execute(q4, [
            "not applicable",
            healthfacility,
        ]);
        return {
            yes: yes[0].length,
            no: no[0].length,
            dontknow: dontknow[0].length,
            notapplicable: notapplicable[0].length,
        };
    }
    catch (error) {
        connection.rollback();
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getconvulsions = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
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
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getsurgery = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
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
        const result2 = yield connection.execute(q2, ["yes", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const gettearsthroughsphincter = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
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
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getpostpartiumhaemorrghage = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getstillbirths = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getprematuredeliveries = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getlowbirthbabies = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getbabieswhodied = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getmiscarriages = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
//dailyhabits and lifestyle
const getSmokers = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
        console.log(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getAlcohol = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getThreatened = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["no", healthfacility]);
        return { yes: result[0].length, no: result2[0].length };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const whodoyoulivewith = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Partner", healthfacility]);
        const result2 = yield connection.execute(q2, ["Relative", healthfacility]);
        const result3 = yield connection.execute(q3, ["Alone", healthfacility]);
        const result4 = yield connection.execute(q4, ["Friend", healthfacility]);
        const result5 = yield connection.execute(q5, [healthfacility]);
        return {
            partner: result[0].length,
            relative: result2[0].length,
            alone: result3[0].length,
            friend: result4[0].length,
            others: result5[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
//medicalhistory
const getcough = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getpalpitations = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getdifficultybreathing = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getswellingoffeet = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getchestpain = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getepigastricpain = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getseveretiredness = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getsevereabdominalpain = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getpersistentvomiting = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getseverediarrhoea = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
//urinary
const getpainwithurination = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getsevereflankpain = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getbloodinurine = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
//gynaelogical
const getvaginaldischarge = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getdeeppelvicpain = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getsyphilis = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getpersistentdrycough = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getprogressiveweightloss = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getnightsweats = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getdiagnosedwithtuberculosis = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const gettreatedTBpreviously = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
//pastmedicalhistory
const getheartdisease = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getanaemia = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getkidneydisease = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getsicklecell = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getdiabetes = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getgoitre = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const gethivaids = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getotherseriouschronicillnesses = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const gethadsurgery = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
//drug history
const getherbalremedies = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getotcdrugs = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getvitamins = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getdietarysupplements = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const gettetanus = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
        const result = yield connection.execute(q, ["Yes", healthfacility]);
        const result2 = yield connection.execute(q2, ["No", healthfacility]);
        return {
            yes: result[0].length,
            no: result2[0].length,
        };
    }
    catch (error) {
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const healthfacilitygeneraldata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { healthfacility } = req.query;
    try {
        //personalinformation
        const edd = yield getedd2(healthfacility);
        const firstbabymovement = yield getfirstbabymovement(healthfacility);
        const parity = yield getparity(healthfacility);
        const babysmovement = yield getbabysmovement(healthfacility);
        const graviditygreaterthan8result = yield graviditygreaterthan8(healthfacility);
        const graviditylessthan8result = yield graviditylessthan8(healthfacility);
        //obstetric
        const convulsionsduringpregnancy = yield getconvulsions(healthfacility);
        const caesarean = yield getsurgery(healthfacility);
        const tearsthroughsphincter = yield gettearsthroughsphincter(healthfacility);
        const postpartiumhaemorrghage = yield getpostpartiumhaemorrghage(healthfacility);
        const stillbirths = yield getstillbirths(healthfacility);
        const prematuredeliveries = yield getprematuredeliveries(healthfacility);
        const lowbirthbabies = yield getlowbirthbabies(healthfacility);
        const babieswhodied = yield getbabieswhodied(healthfacility);
        const miscarriages = yield getmiscarriages(healthfacility);
        //dailyhabitsandlifestyle
        const doyousmoke = yield getSmokers(healthfacility);
        const alcohol = yield getAlcohol(healthfacility);
        const threatened = yield getThreatened(healthfacility);
        const livewith = yield whodoyoulivewith(healthfacility);
        //medicalhistory
        const cough = yield getcough(healthfacility);
        const palpitations = yield getpalpitations(healthfacility);
        const difficultybreathing = yield getdifficultybreathing(healthfacility);
        const swellingfeet = yield getswellingoffeet(healthfacility);
        const chestpain = yield getchestpain(healthfacility);
        const epigastricpain = yield getepigastricpain(healthfacility);
        const severetiredness = yield getseveretiredness(healthfacility);
        const severeabdominalpain = yield getsevereabdominalpain(healthfacility);
        const persistentvomiting = yield getpersistentvomiting(healthfacility);
        const severediarrhoea = yield getseverediarrhoea(healthfacility);
        //urinary
        const painwithurination = yield getpainwithurination(healthfacility);
        const severeflankpain = yield getsevereflankpain(healthfacility);
        const bloodinurine = yield getbloodinurine(healthfacility);
        //gynaecological
        const vaginaldischarge = yield getvaginaldischarge(healthfacility);
        const deeppelvicpain = yield getdeeppelvicpain(healthfacility);
        const syphilis = yield getsyphilis(healthfacility);
        const persistentdrycough = yield getpersistentdrycough(healthfacility);
        const progressiveweightloss = yield getprogressiveweightloss(healthfacility);
        const nightsweats = yield getnightsweats(healthfacility);
        const diagnosedwithtuberculosis = yield getdiagnosedwithtuberculosis(healthfacility);
        const treatedTBpreviously = yield gettreatedTBpreviously(healthfacility);
        //pastmedicalhistory
        const heartdisease = yield getheartdisease(healthfacility);
        const anaemia = yield getanaemia(healthfacility);
        const kidneydisease = yield getkidneydisease(healthfacility);
        const sicklecell = yield getsicklecell(healthfacility);
        const diabetes = yield getdiabetes(healthfacility);
        const goitre = yield getgoitre(healthfacility);
        const hivaids = yield gethivaids(healthfacility);
        const otherseriouschronicillnesses = yield getotherseriouschronicillnesses(healthfacility);
        const hadsurgery = yield gethadsurgery(healthfacility);
        //drughistory
        const herbalremedies = yield getherbalremedies(healthfacility);
        const otcdrugs = yield getotcdrugs(healthfacility);
        const vitamins = yield getvitamins(healthfacility);
        const dietarysupplements = yield getdietarysupplements(healthfacility);
        const tetanus = yield gettetanus(healthfacility);
        res.status(200).json({
            edd,
            convulsionsduringpregnancy,
            caesarean,
            tearsthroughsphincter,
            postpartiumhaemorrghage,
            firstbabymovement,
            parity,
            babysmovement,
            graviditygreaterthan8result,
            graviditylessthan8result,
            stillbirths,
            prematuredeliveries,
            lowbirthbabies,
            babieswhodied,
            miscarriages,
            doyousmoke,
            alcohol,
            threatened,
            livewith,
            cough,
            palpitations,
            difficultybreathing,
            swellingfeet,
            chestpain,
            epigastricpain,
            severetiredness,
            severeabdominalpain,
            persistentvomiting,
            severediarrhoea,
            painwithurination,
            severeflankpain,
            bloodinurine,
            vaginaldischarge,
            deeppelvicpain,
            syphilis,
            persistentdrycough,
            progressiveweightloss,
            nightsweats,
            diagnosedwithtuberculosis,
            treatedTBpreviously,
            heartdisease,
            anaemia,
            kidneydisease,
            sicklecell,
            diabetes,
            goitre,
            hivaids,
            otherseriouschronicillnesses,
            hadsurgery,
            herbalremedies,
            otcdrugs,
            vitamins,
            dietarysupplements,
            tetanus,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    finally {
    }
});
exports.healthfacilitygeneraldata = healthfacilitygeneraldata;
const healthfacilityreturnvisitdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { healthfacility } = req.query;
    const getfeverreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.fever = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.fever = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getheadachereturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.headache = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.headache = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getcoughreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.cough = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.cough = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getpalpitationsreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.palpitation = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.palpitation = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getseveretirednessreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severetirednesss = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severetirednesss = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getdifficultylyingflatreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.difficultylyingflat = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.difficultylyingflat = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getdizzinessreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.dizziness = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.dizziness = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getconvulsionsreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.convulsions = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.convulsions = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getabdominalpainreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severeabdominalpain = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severeabdominalpain = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getpainwithurinationreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.urinarypain = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.urinarypain = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getbloodinurinereturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.bloodinurine = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.bloodinurine = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getvaginaldischargereturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.vaginaldischarge = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.vaginaldischarge = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getdeeppelvicpainreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.painduringsex = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.painduringsex = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getsyphilisreturn = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.syphillis = ? AND pi.healthfacility = ?
      `;
            const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.syphillis = ? AND pi.healthfacility = ?
      `;
            const result = yield connection.execute(q, ["Yes", healthfacility]);
            const result2 = yield connection.execute(q2, ["No", healthfacility]);
            return {
                yes: result[0].length,
                no: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    try {
        const fever = yield getfeverreturn(healthfacility);
        const headache = yield getheadachereturn(healthfacility);
        const cough = yield getcoughreturn(healthfacility);
        const palpitations = yield getpalpitationsreturn(healthfacility);
        const severetiredness = yield getseveretirednessreturn(healthfacility);
        const difficultylyingflat = yield getdifficultylyingflatreturn(healthfacility);
        const dizziness = yield getdizzinessreturn(healthfacility);
        const convulsionsduringpregnancy = yield getconvulsionsreturn(healthfacility);
        const abdominalpain = yield getabdominalpainreturn(healthfacility);
        const painwithurination = yield getpainwithurinationreturn(healthfacility);
        const bloodinurine = yield getbloodinurinereturn(healthfacility);
        const vaginaldischarge = yield getvaginaldischargereturn(healthfacility);
        const deeppelvicpain = yield getdeeppelvicpainreturn(healthfacility);
        const syphilis = yield getsyphilisreturn(healthfacility);
        res.status(200).json({
            fever,
            headache,
            cough,
            palpitations,
            severetiredness,
            difficultylyingflat,
            dizziness,
            convulsionsduringpregnancy,
            abdominalpain,
            painwithurination,
            bloodinurine,
            vaginaldischarge,
            deeppelvicpain,
            syphilis,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    finally {
    }
});
exports.healthfacilityreturnvisitdata = healthfacilityreturnvisitdata;
const healthfacilityscheduledata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { healthfacility } = req.query;
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      pi.healthfacility = ?`;
        const q2 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.missed = ? AND pi.healthfacility = ?`;
        const q3 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.completed = ? AND pi.healthfacility = ?`;
        const q4 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.upcoming = ? AND pi.healthfacility = ?`;
        const q5 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.flagged = ? AND pi.healthfacility = ?`;
        const [number] = yield connection.execute(q, [healthfacility]);
        const [missed] = yield connection.execute(q2, [1, healthfacility]);
        const [completed] = yield connection.execute(q3, [1, healthfacility]);
        const [upcoming] = yield connection.execute(q4, [1, healthfacility]);
        const [flagged] = yield connection.execute(q5, [1, healthfacility]);
        res.status(200).json({
            number: number.length,
            missed: missed.length,
            completed: completed.length,
            upcoming: upcoming.length,
            flagged: flagged.length,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.healthfacilityscheduledata = healthfacilityscheduledata;
//testresult
const healthfacilitytestdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { healthfacility } = req.query;
    const gethiv = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.hiv = ? AND pi.healthfacility = ?`;
            const q2 = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.hiv = ? AND pi.healthfacility = ?`;
            const result = yield connection.execute(q, ["+ve", healthfacility]);
            const result2 = yield connection.execute(q2, ["-ve", healthfacility]);
            return {
                positive: result[0].length,
                negative: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getmalariarapid = (healthfacility) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.malariarapid = ? AND pi.healthfacility = ?`;
            const q2 = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.malariarapid = ? AND pi.healthfacility = ?`;
            const result = yield connection.execute(q, ["+ve", healthfacility]);
            const result2 = yield connection.execute(q2, ["-ve", healthfacility]);
            return {
                positive: result[0].length,
                negative: result2[0].length,
            };
        }
        catch (error) {
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    try {
        const hiv = yield gethiv(healthfacility);
        const malariarapid = yield getmalariarapid(healthfacility);
        res.status(200).json({
            hiv: hiv,
            malariarapid: malariarapid,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.healthfacilitytestdata = healthfacilitytestdata;
//get all health facilities
const getAllHealthfacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.query;
    const q1 = `SELECT * FROM healthfacilityaccount WHERE state = ?`;
    const q2 = `SELECT * FROM healthfacilityaccount`;
    const connection = yield db_1.default.getConnection();
    try {
        if (state) {
            const [result] = yield connection.execute(q1, [state]);
            res.status(200).json(result);
        }
        else {
            const [result] = yield connection.execute(q2);
            res.status(200).json(result);
        }
    }
    catch (error) {
        connection.release();
        logger_1.default.error(error);
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllHealthfacility = getAllHealthfacility;
