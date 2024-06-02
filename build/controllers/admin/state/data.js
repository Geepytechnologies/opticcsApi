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
exports.statetestdata = exports.getAllStatesAsArray = exports.getAllStates = exports.statescheduledata = exports.statereturnvisitdata = exports.numberofwomenwith4visits = exports.stategeneraldata = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const logger_1 = __importDefault(require("../../../logger"));
const numberofwomenwith4visits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { state } = req.query;
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
    AND hp.state = ?
        
      `;
        const result = yield connection.execute(q, [state]);
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
const numberofwomentestedformalaria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { state } = req.query;
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
    AND hp.state = ?
        
      `;
        const result = yield connection.execute(q, [state]);
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
const graviditygreaterthan8 = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND state = ?`;
        const result = yield connection.execute(q, [state]);
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
const graviditylessthan8 = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8 AND state = ?`;
        const result = yield connection.execute(q, [state]);
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
        state,lga,healthFacility
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
const getedd2 = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
      state, lga, healthFacility
    FROM personalinformation WHERE state = ?
  ) AS subquery ON quarters.quarter = subquery.quarter
  GROUP BY quarters.quarter
  ORDER BY MIN(subquery.edd);
  
    
  `;
        const result = yield connection.execute(q, [state]);
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
const getparity = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) <= 24 AND state = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) > 24 AND state = ?;
  `;
        const less = yield connection.execute(q1, [state]);
        const greater = yield connection.execute(q2, [state]);
        return { less: less[0].length, greater: greater[0].length };
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
const getbabysmovement = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
        const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? ANd state = ?;
  `;
        const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
        const yes = yield connection.execute(q1, ["yes", state]);
        const no = yield connection.execute(q2, ["no", state]);
        const dontknow = yield connection.execute(q3, ["i don't know", state]);
        const notapplicable = yield connection.execute(q4, [
            "not applicable",
            state,
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
const getfirstbabymovement = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE doyouknowdateoffirtbabymovement = ? AND state = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
        const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
        const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
        const yes = yield connection.execute(q1, ["yes", state]);
        const no = yield connection.execute(q2, ["no", state]);
        const dontknow = yield connection.execute(q3, ["i don't know", state]);
        const notapplicable = yield connection.execute(q4, [
            "not applicable",
            state,
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
const getconvulsions = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
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
    AND pi.state = ?`;
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getsurgery = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
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
    AND pi.state = ?`;
        const result2 = yield connection.execute(q2, ["yes", state]);
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
const gettearsthroughsphincter = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
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
    AND pi.state = ?`;
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getpostpartiumhaemorrghage = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getstillbirths = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getprematuredeliveries = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getlowbirthbabies = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getbabieswhodied = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getmiscarriages = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getSmokers = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getAlcohol = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const getThreatened = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["yes", state]);
        const result2 = yield connection.execute(q2, ["no", state]);
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
const whodoyoulivewith = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
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
    AND pi.state = ? AND specifywhodoyoulivewith <> '';`;
        const result = yield connection.execute(q, ["Partner", state]);
        const result2 = yield connection.execute(q2, ["Relative", state]);
        const result3 = yield connection.execute(q3, ["Alone", state]);
        const result4 = yield connection.execute(q4, ["Friend", state]);
        const result5 = yield connection.execute(q5, [state]);
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
const getcough = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getpalpitations = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getdifficultybreathing = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getswellingoffeet = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getchestpain = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getepigastricpain = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getseveretiredness = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getsevereabdominalpain = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getpersistentvomiting = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getseverediarrhoea = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getdizziness = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.dizziness = ?
      AND pi.state = ?
    `;
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
      mh.dizziness = ?
      AND pi.state = ?
    `;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getpainwithurination = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getsevereflankpain = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getbloodinurine = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getvaginaldischarge = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getdeeppelvicpain = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getsyphilis = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getpersistentdrycough = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getprogressiveweightloss = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getnightsweats = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getdiagnosedwithtuberculosis = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const gettreatedTBpreviously = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getheartdisease = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getanaemia = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getkidneydisease = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getsicklecell = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getdiabetes = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getgoitre = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const gethivaids = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getotherseriouschronicillnesses = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const gethadsurgery = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getherbalremedies = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getotcdrugs = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getvitamins = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const getdietarysupplements = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const gettetanus = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
        const result = yield connection.execute(q, ["Yes", state]);
        const result2 = yield connection.execute(q2, ["No", state]);
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
const stategeneraldata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.query;
    try {
        //personalinformation
        const edd = yield getedd2(state);
        const firstbabymovement = yield getfirstbabymovement(state);
        const parity = yield getparity(state);
        const babysmovement = yield getbabysmovement(state);
        const graviditygreaterthan8result = yield graviditygreaterthan8(state);
        const graviditylessthan8result = yield graviditylessthan8(state);
        //obstetric
        const convulsionsduringpregnancy = yield getconvulsions(state);
        const caesarean = yield getsurgery(state);
        const tearsthroughsphincter = yield gettearsthroughsphincter(state);
        const postpartiumhaemorrghage = yield getpostpartiumhaemorrghage(state);
        const stillbirths = yield getstillbirths(state);
        const prematuredeliveries = yield getprematuredeliveries(state);
        const lowbirthbabies = yield getlowbirthbabies(state);
        const babieswhodied = yield getbabieswhodied(state);
        const miscarriages = yield getmiscarriages(state);
        //dailyhabitsandlifestyle
        const doyousmoke = yield getSmokers(state);
        const alcohol = yield getAlcohol(state);
        const threatened = yield getThreatened(state);
        const livewith = yield whodoyoulivewith(state);
        //medicalhistory
        const cough = yield getcough(state);
        const palpitations = yield getpalpitations(state);
        const difficultybreathing = yield getdifficultybreathing(state);
        const swellingfeet = yield getswellingoffeet(state);
        const chestpain = yield getchestpain(state);
        const epigastricpain = yield getepigastricpain(state);
        const severetiredness = yield getseveretiredness(state);
        const severeabdominalpain = yield getsevereabdominalpain(state);
        const persistentvomiting = yield getpersistentvomiting(state);
        const severediarrhoea = yield getseverediarrhoea(state);
        const dizziness = yield getdizziness(state);
        //urinary
        const painwithurination = yield getpainwithurination(state);
        const severeflankpain = yield getsevereflankpain(state);
        const bloodinurine = yield getbloodinurine(state);
        //gynaecological
        const vaginaldischarge = yield getvaginaldischarge(state);
        const deeppelvicpain = yield getdeeppelvicpain(state);
        const syphilis = yield getsyphilis(state);
        const persistentdrycough = yield getpersistentdrycough(state);
        const progressiveweightloss = yield getprogressiveweightloss(state);
        const nightsweats = yield getnightsweats(state);
        const diagnosedwithtuberculosis = yield getdiagnosedwithtuberculosis(state);
        const treatedTBpreviously = yield gettreatedTBpreviously(state);
        //pastmedicalhistory
        const heartdisease = yield getheartdisease(state);
        const anaemia = yield getanaemia(state);
        const kidneydisease = yield getkidneydisease(state);
        const sicklecell = yield getsicklecell(state);
        const diabetes = yield getdiabetes(state);
        const goitre = yield getgoitre(state);
        const hivaids = yield gethivaids(state);
        const otherseriouschronicillnesses = yield getotherseriouschronicillnesses(state);
        const hadsurgery = yield gethadsurgery(state);
        //drughistory
        const herbalremedies = yield getherbalremedies(state);
        const otcdrugs = yield getotcdrugs(state);
        const vitamins = yield getvitamins(state);
        const dietarysupplements = yield getdietarysupplements(state);
        const tetanus = yield gettetanus(state);
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
            dizziness,
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
exports.stategeneraldata = stategeneraldata;
const statereturnvisitdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.query;
    const anc = req.query.anc || 2;
    logger_1.default.info(`statereturnvisitdata of anc ${anc}`);
    const getfeverreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.fever = ?  AND pi.state = ? AND rv.anc = ?
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
        rv.fever = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getheadachereturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.headache = ? AND pi.state = ? AND rv.anc = ?
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
        rv.headache = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getcoughreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.cough = ? AND pi.state = ? AND rv.anc = ?
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
        rv.cough = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getpalpitationsreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.palpitation = ? AND pi.state = ? AND rv.anc = ?
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
        rv.palpitation = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getseveretirednessreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.severetirednesss = ? AND pi.state = ? AND rv.anc = ?
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
        rv.severetirednesss = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getdifficultylyingflatreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.difficultylyingflat = ? AND pi.state = ? AND rv.anc = ?
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
        rv.difficultylyingflat = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getdizzinessreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.dizziness = ? AND pi.state = ? AND rv.anc = ?
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
        rv.dizziness = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getconvulsionsreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.convulsions = ? AND pi.state = ? AND rv.anc = ?
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
        rv.convulsions = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getabdominalpainreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.severeabdominalpain = ? AND pi.state = ? AND rv.anc = ?
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
        rv.severeabdominalpain = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getpainwithurinationreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.urinarypain = ? AND pi.state = ? AND rv.anc = ?
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
        rv.urinarypain = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getbloodinurinereturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.bloodinurine = ? AND pi.state = ? AND rv.anc = ?
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
        rv.bloodinurine = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getvaginaldischargereturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.vaginaldischarge = ? AND pi.state = ? AND rv.anc = ?
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
        rv.vaginaldischarge = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getdeeppelvicpainreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.painduringsex = ? AND pi.state = ? AND rv.anc = ?
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
        rv.painduringsex = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
    const getsyphilisreturn = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.syphillis = ? AND pi.state = ? AND rv.anc = ?
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
        rv.syphillis = ? AND pi.state = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", state, anc]);
            const result2 = yield connection.execute(q2, ["No", state, anc]);
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
        const fever = yield getfeverreturn(state);
        const headache = yield getheadachereturn(state);
        const cough = yield getcoughreturn(state);
        const palpitations = yield getpalpitationsreturn(state);
        const severetiredness = yield getseveretirednessreturn(state);
        const difficultylyingflat = yield getdifficultylyingflatreturn(state);
        const dizziness = yield getdizzinessreturn(state);
        const convulsionsduringpregnancy = yield getconvulsionsreturn(state);
        const abdominalpain = yield getabdominalpainreturn(state);
        const painwithurination = yield getpainwithurinationreturn(state);
        const bloodinurine = yield getbloodinurinereturn(state);
        const vaginaldischarge = yield getvaginaldischargereturn(state);
        const deeppelvicpain = yield getdeeppelvicpainreturn(state);
        const syphilis = yield getsyphilisreturn(state);
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
        logger_1.default.log(error + ": " + "from statereturnvisitdata");
        res.status(500).json(error);
    }
    finally {
    }
});
exports.statereturnvisitdata = statereturnvisitdata;
const statescheduledata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.query;
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
      pi.state = ?`;
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
      sc.missed = ? AND pi.state = ?`;
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
      sc.completed = ? AND pi.state = ?`;
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
      sc.upcoming = ? AND pi.state = ?`;
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
      sc.flagged = ? AND pi.state = ?`;
        const [number] = yield connection.execute(q, [state]);
        const [missed] = yield connection.execute(q2, [1, state]);
        const [completed] = yield connection.execute(q3, [1, state]);
        const [upcoming] = yield connection.execute(q4, [1, state]);
        const [flagged] = yield connection.execute(q5, [1, state]);
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
exports.statescheduledata = statescheduledata;
//get all states
const getAllStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = `SELECT * FROM stateaccount`;
    const connection = yield db_1.default.getConnection();
    try {
        const [result] = yield connection.execute(q);
        res.status(200).json(result);
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllStates = getAllStates;
//get all states returned as an array
const getAllStatesAsArray = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = `SELECT state FROM stateaccount`;
    const connection = yield db_1.default.getConnection();
    try {
        const [result] = yield connection.execute(q);
        const mystates = result.map((item) => item.state);
        res.status(200).json(mystates);
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllStatesAsArray = getAllStatesAsArray;
//testresult
const statetestdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.query;
    const gethiv = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
      sc.hiv = ? AND pi.state = ?`;
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
      sc.hiv = ? AND pi.state = ?`;
            const result = yield connection.execute(q, ["+ve", state]);
            const result2 = yield connection.execute(q2, ["-ve", state]);
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
    const getmalariarapid = (state) => __awaiter(void 0, void 0, void 0, function* () {
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
      sc.malariarapid = ? AND pi.state = ?`;
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
      sc.malariarapid = ? AND pi.state = ?`;
            const result = yield connection.execute(q, ["+ve", state]);
            const result2 = yield connection.execute(q2, ["-ve", state]);
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
        const hiv = yield gethiv(state);
        const malariarapid = yield getmalariarapid(state);
        res.status(200).json({
            hiv: hiv,
            malariarapid: malariarapid,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.statetestdata = statetestdata;
