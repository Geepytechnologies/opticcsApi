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
exports.lgatestdata = exports.getAllLga = exports.lgascheduledata = exports.lgareturnvisitdata = exports.numberofwomenwith4visits = exports.lgageneraldata = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const logger_1 = __importDefault(require("../../../logger"));
const numberofwomenwith4visits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { lga } = req.query;
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
    AND hp.lga = ?
        
      `;
        const result = yield connection.execute(q, [lga]);
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
const graviditygreaterthan8 = (lga) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND lga = ?`;
        const result = yield connection.execute(q, [lga]);
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
const graviditylessthan8 = (lga) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8 AND lga = ?`;
        const result = yield connection.execute(q, [lga]);
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
        lga,lga,healthFacility
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
const getedd2 = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
      lga, healthFacility
    FROM personalinformation WHERE lga = ?
  ) AS subquery ON quarters.quarter = subquery.quarter
  GROUP BY quarters.quarter
  ORDER BY MIN(subquery.edd);
  
    
  `;
        const result = yield connection.execute(q, [lga]);
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
const getparity = (lga) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) <= 24 AND lga = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) > 24 AND lga = ?;
  `;
        const less = yield connection.execute(q1, [lga]);
        const greater = yield connection.execute(q2, [lga]);
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
const getbabysmovement = (lga) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
        const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? ANd lga = ?;
  `;
        const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
        const yes = yield connection.execute(q1, ["yes", lga]);
        const no = yield connection.execute(q2, ["no", lga]);
        const dontknow = yield connection.execute(q3, ["i don't know", lga]);
        const notapplicable = yield connection.execute(q4, ["not applicable", lga]);
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
const getfirstbabymovement = (lga) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE doyouknowdateoffirtbabymovement = ? AND lga = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
        const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
        const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
        const yes = yield connection.execute(q1, ["yes", lga]);
        const no = yield connection.execute(q2, ["no", lga]);
        const dontknow = yield connection.execute(q3, ["i don't know", lga]);
        const notapplicable = yield connection.execute(q4, ["not applicable", lga]);
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
const getconvulsions = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
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
    AND pi.lga = ?`;
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getsurgery = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
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
    AND pi.lga = ?`;
        const result2 = yield connection.execute(q2, ["yes", lga]);
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
const gettearsthroughsphincter = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
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
    AND pi.lga = ?`;
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getpostpartiumhaemorrghage = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getstillbirths = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getprematuredeliveries = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getlowbirthbabies = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getbabieswhodied = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getmiscarriages = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getSmokers = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getAlcohol = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const getThreatened = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["yes", lga]);
        const result2 = yield connection.execute(q2, ["no", lga]);
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
const whodoyoulivewith = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
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
    AND pi.lga = ? AND specifywhodoyoulivewith <> '';`;
        const result = yield connection.execute(q, ["Partner", lga]);
        const result2 = yield connection.execute(q2, ["Relative", lga]);
        const result3 = yield connection.execute(q3, ["Alone", lga]);
        const result4 = yield connection.execute(q4, ["Friend", lga]);
        const result5 = yield connection.execute(q5, [lga]);
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
const getcough = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getpalpitations = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getdifficultybreathing = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getswellingoffeet = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getchestpain = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getepigastricpain = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getseveretiredness = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getsevereabdominalpain = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getpersistentvomiting = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getseverediarrhoea = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getdizziness = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
      AND pi.lga = ?
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
      AND pi.lga = ?
    `;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getpainwithurination = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getsevereflankpain = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getbloodinurine = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getvaginaldischarge = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getdeeppelvicpain = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getsyphilis = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getpersistentdrycough = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getprogressiveweightloss = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getnightsweats = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getdiagnosedwithtuberculosis = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const gettreatedTBpreviously = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getheartdisease = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getanaemia = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getkidneydisease = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getsicklecell = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getdiabetes = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getgoitre = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const gethivaids = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getotherseriouschronicillnesses = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const gethadsurgery = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getherbalremedies = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getotcdrugs = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getvitamins = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const getdietarysupplements = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const gettetanus = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
        const result = yield connection.execute(q, ["Yes", lga]);
        const result2 = yield connection.execute(q2, ["No", lga]);
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
const lgageneraldata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lga } = req.query;
    try {
        //personalinformation
        const edd = yield getedd2(lga);
        const firstbabymovement = yield getfirstbabymovement(lga);
        const parity = yield getparity(lga);
        const babysmovement = yield getbabysmovement(lga);
        const graviditygreaterthan8result = yield graviditygreaterthan8(lga);
        const graviditylessthan8result = yield graviditylessthan8(lga);
        //obstetric
        const convulsionsduringpregnancy = yield getconvulsions(lga);
        const caesarean = yield getsurgery(lga);
        const tearsthroughsphincter = yield gettearsthroughsphincter(lga);
        const postpartiumhaemorrghage = yield getpostpartiumhaemorrghage(lga);
        const stillbirths = yield getstillbirths(lga);
        const prematuredeliveries = yield getprematuredeliveries(lga);
        const lowbirthbabies = yield getlowbirthbabies(lga);
        const babieswhodied = yield getbabieswhodied(lga);
        const miscarriages = yield getmiscarriages(lga);
        //dailyhabitsandlifestyle
        const doyousmoke = yield getSmokers(lga);
        const alcohol = yield getAlcohol(lga);
        const threatened = yield getThreatened(lga);
        const livewith = yield whodoyoulivewith(lga);
        //medicalhistory
        const cough = yield getcough(lga);
        const palpitations = yield getpalpitations(lga);
        const difficultybreathing = yield getdifficultybreathing(lga);
        const swellingfeet = yield getswellingoffeet(lga);
        const chestpain = yield getchestpain(lga);
        const epigastricpain = yield getepigastricpain(lga);
        const severetiredness = yield getseveretiredness(lga);
        const severeabdominalpain = yield getsevereabdominalpain(lga);
        const persistentvomiting = yield getpersistentvomiting(lga);
        const severediarrhoea = yield getseverediarrhoea(lga);
        const dizziness = yield getdizziness(lga);
        //urinary
        const painwithurination = yield getpainwithurination(lga);
        const severeflankpain = yield getsevereflankpain(lga);
        const bloodinurine = yield getbloodinurine(lga);
        //gynaecological
        const vaginaldischarge = yield getvaginaldischarge(lga);
        const deeppelvicpain = yield getdeeppelvicpain(lga);
        const syphilis = yield getsyphilis(lga);
        const persistentdrycough = yield getpersistentdrycough(lga);
        const progressiveweightloss = yield getprogressiveweightloss(lga);
        const nightsweats = yield getnightsweats(lga);
        const diagnosedwithtuberculosis = yield getdiagnosedwithtuberculosis(lga);
        const treatedTBpreviously = yield gettreatedTBpreviously(lga);
        //pastmedicalhistory
        const heartdisease = yield getheartdisease(lga);
        const anaemia = yield getanaemia(lga);
        const kidneydisease = yield getkidneydisease(lga);
        const sicklecell = yield getsicklecell(lga);
        const diabetes = yield getdiabetes(lga);
        const goitre = yield getgoitre(lga);
        const hivaids = yield gethivaids(lga);
        const otherseriouschronicillnesses = yield getotherseriouschronicillnesses(lga);
        const hadsurgery = yield gethadsurgery(lga);
        //drughistory
        const herbalremedies = yield getherbalremedies(lga);
        const otcdrugs = yield getotcdrugs(lga);
        const vitamins = yield getvitamins(lga);
        const dietarysupplements = yield getdietarysupplements(lga);
        const tetanus = yield gettetanus(lga);
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
exports.lgageneraldata = lgageneraldata;
const lgareturnvisitdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lga } = req.query;
    const anc = req.query.anc || 2;
    const getfeverreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.fever = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.fever = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getheadachereturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.headache = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.headache = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getcoughreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.cough = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.cough = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getpalpitationsreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.palpitation = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.palpitation = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getseveretirednessreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.severetirednesss = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.severetirednesss = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getdifficultylyingflatreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.difficultylyingflat = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.difficultylyingflat = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getdizzinessreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.dizziness = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.dizziness = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getconvulsionsreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.convulsions = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.convulsions = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getabdominalpainreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.severeabdominalpain = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.severeabdominalpain = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getpainwithurinationreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.urinarypain = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.urinarypain = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getbloodinurinereturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.bloodinurine = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.bloodinurine = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getvaginaldischargereturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.vaginaldischarge = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.vaginaldischarge = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getdeeppelvicpainreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.painduringsex = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.painduringsex = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
    const getsyphilisreturn = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.syphillis = ? AND pi.lga = ? AND rv.anc = ?
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
        rv.syphillis = ? AND pi.lga = ? AND rv.anc = ?
      `;
            const result = yield connection.execute(q, ["Yes", lga, anc]);
            const result2 = yield connection.execute(q2, ["No", lga, anc]);
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
        const fever = yield getfeverreturn(lga);
        const headache = yield getheadachereturn(lga);
        const cough = yield getcoughreturn(lga);
        const palpitations = yield getpalpitationsreturn(lga);
        const severetiredness = yield getseveretirednessreturn(lga);
        const difficultylyingflat = yield getdifficultylyingflatreturn(lga);
        const dizziness = yield getdizzinessreturn(lga);
        const convulsionsduringpregnancy = yield getconvulsionsreturn(lga);
        const abdominalpain = yield getabdominalpainreturn(lga);
        const painwithurination = yield getpainwithurinationreturn(lga);
        const bloodinurine = yield getbloodinurinereturn(lga);
        const vaginaldischarge = yield getvaginaldischargereturn(lga);
        const deeppelvicpain = yield getdeeppelvicpainreturn(lga);
        const syphilis = yield getsyphilisreturn(lga);
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
exports.lgareturnvisitdata = lgareturnvisitdata;
const lgascheduledata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lga } = req.query;
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
      pi.lga = ?`;
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
      sc.missed = ? AND pi.lga = ?`;
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
      sc.completed = ? AND pi.lga = ?`;
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
      sc.upcoming = ? AND pi.lga = ?`;
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
      sc.flagged = ? AND pi.lga = ?`;
        const [number] = yield connection.execute(q, [lga]);
        const [missed] = yield connection.execute(q2, [1, lga]);
        const [completed] = yield connection.execute(q3, [1, lga]);
        const [upcoming] = yield connection.execute(q4, [1, lga]);
        const [flagged] = yield connection.execute(q5, [1, lga]);
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
exports.lgascheduledata = lgascheduledata;
//get all lga's
const getAllLga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.query;
    const q1 = `SELECT * FROM lgaccount WHERE state = ?`;
    const q2 = `SELECT * FROM lgaccount`;
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
exports.getAllLga = getAllLga;
//testresult
const lgatestdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lga } = req.query;
    const gethiv = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
      sc.hiv = ? AND pi.lga = ?`;
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
      sc.hiv = ? AND pi.lga = ?`;
            const result = yield connection.execute(q, ["+ve", lga]);
            const result2 = yield connection.execute(q2, ["-ve", lga]);
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
    const getmalariarapid = (lga) => __awaiter(void 0, void 0, void 0, function* () {
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
      sc.malariarapid = ? AND pi.lga = ?`;
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
      sc.malariarapid = ? AND pi.lga = ?`;
            const result = yield connection.execute(q, ["+ve", lga]);
            const result2 = yield connection.execute(q2, ["-ve", lga]);
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
        const hiv = yield gethiv(lga);
        const malariarapid = yield getmalariarapid(lga);
        res.status(200).json({
            hiv: hiv,
            malariarapid: malariarapid,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.lgatestdata = lgatestdata;
