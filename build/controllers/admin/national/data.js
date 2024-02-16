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
exports.nationaltestdata = exports.nationalscheduledata = exports.getvisitdates = exports.numberofwomenwith4visits = exports.nationalreturnvisitdata = exports.nationalgeneraldata = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const logger_1 = __importDefault(require("../../../logger"));
const numberofwomenwith4visits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
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
      WHERE (COALESCE(fv.first_visit_count, 0) + COALESCE(ev.return_visit_count, 0)) > 4;    
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
exports.numberofwomenwith4visits = numberofwomenwith4visits;
const graviditygreaterthan8 = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8`;
        const result = yield connection.execute(q);
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
const graviditylessthan8 = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8`;
        const result = yield connection.execute(q);
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
        ,lga,healthFacility
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
const getedd2 = () => __awaiter(void 0, void 0, void 0, function* () {
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
    FROM personalinformation
  ) AS subquery ON quarters.quarter = subquery.quarter
  GROUP BY quarters.quarter
  ORDER BY MIN(subquery.edd);
  
    
  `;
        const result = yield connection.execute(q);
        return result[0];
    }
    catch (error) {
        console.log({ edd_error: error });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getparity = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) <= 24;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) > 24;
  `;
        const less = yield connection.execute(q1);
        const greater = yield connection.execute(q2);
        return { less: less[0].length, greater: greater[0].length };
    }
    catch (error) {
        connection.rollback();
        throw error;
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getbabysmovement = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ?;
  `;
        const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ?;
  `;
        const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ?;
  `;
        const yes = yield connection.execute(q1, ["yes"]);
        const no = yield connection.execute(q2, ["no"]);
        const dontknow = yield connection.execute(q3, ["i don't know"]);
        const notapplicable = yield connection.execute(q4, ["not applicable"]);
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
const getfirstbabymovement = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q1 = `SELECT *
      FROM personalinformation
      WHERE doyouknowdateoffirtbabymovement = ?;
  `;
        const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ?;
  `;
        const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ?;
  `;
        const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ?;
  `;
        const yes = yield connection.execute(q1, ["yes"]);
        const no = yield connection.execute(q2, ["no"]);
        const dontknow = yield connection.execute(q3, ["i don't know"]);
        const notapplicable = yield connection.execute(q4, ["not applicable"]);
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
//obstetrichistory
const getconvulsions = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const q2 = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
        const result2 = yield connection.execute(q2, ["yes"]);
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
const getsurgery = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const q2 = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
        const result2 = yield connection.execute(q2, ["yes"]);
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
const gettearsthroughsphincter = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const q2 = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
        const result2 = yield connection.execute(q2, ["no"]);
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
const getpostpartiumhaemorrghage = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
        const q2 = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getstillbirths = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
        const q2 = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getprematuredeliveries = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
        const q2 = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getlowbirthbabies = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
        const q2 = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getbabieswhodied = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
        const q2 = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getmiscarriages = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
        const q2 = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getbreastfedbefore = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
        const q2 = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getbreastfeedingduration = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
        const q2 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
        const q3 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
        const result = yield connection.execute(q, ["< 6 months"]);
        const result2 = yield connection.execute(q2, ["6 months"]);
        const result3 = yield connection.execute(q3, ["> 6 months"]);
        return {
            less: result[0].length,
            equal: result2[0].length,
            greater: result3[0].length,
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
const getbreastfeedingproblems = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
        const q2 = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getSmokers = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
        const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getAlcohol = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
        const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const getThreatened = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
        const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
        const result = yield connection.execute(q, ["yes"]);
        const result2 = yield connection.execute(q2, ["no"]);
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
const whodoyoulivewith = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
        const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
        const q3 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
        const q4 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
        const q5 = `SELECT * FROM dailyhabitsandlifestyle WHERE specifywhodoyoulivewith IS NOT NULL AND specifywhodoyoulivewith <> '';`;
        const result = yield connection.execute(q, ["Partner"]);
        const result2 = yield connection.execute(q2, ["Relative"]);
        const result3 = yield connection.execute(q3, ["Alone"]);
        const result4 = yield connection.execute(q4, ["Friend"]);
        const result5 = yield connection.execute(q5);
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
const getcough = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.cough = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getpalpitations = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.palpitations = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getdifficultybreathing = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.difficultybreathing = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getswellingoffeet = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.swellingfeet = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getchestpain = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.severechestpain = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getepigastricpain = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.severeepigastricpain = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getseveretiredness = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.severetiredness = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getsevereabdominalpain = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.severeabdominalpain = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getpersistentvomiting = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.persistentvomiting = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getseverediarrhoea = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.severediarrhoea = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getdizziness = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getpainwithurination = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.painwithurination = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getsevereflankpain = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.severeflankpain = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getbloodinurine = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.bloodinurine = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getvaginaldischarge = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.vaginaldischarge = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getdeeppelvicpain = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.deeppelvicpain = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getsyphilis = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.syphilis = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getpersistentdrycough = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.persistentdrycough = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getprogressiveweightloss = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.progressiveweightloss = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getnightsweats = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.nightsweats = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getdiagnosedwithtuberculosis = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.diagnosedwithtuberculosis = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const gettreatedTBpreviously = () => __awaiter(void 0, void 0, void 0, function* () {
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
      mh.treatedTBpreviously = ?
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getheartdisease = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getanaemia = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getkidneydisease = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getsicklecell = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getdiabetes = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getgoitre = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const gethivaids = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getotherseriouschronicillnesses = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const gethadsurgery = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getherbalremedies = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getotcdrugs = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getvitamins = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const getdietarysupplements = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const gettetanus = () => __awaiter(void 0, void 0, void 0, function* () {
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
    `;
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
    `;
        const result = yield connection.execute(q, ["Yes"]);
        const result2 = yield connection.execute(q2, ["No"]);
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
const nationalgeneraldata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.query.date || null;
    try {
        //personalinformation
        const edd = yield getedd2(date);
        const firstbabymovement = yield getfirstbabymovement();
        const parity = yield getparity(date);
        const babysmovement = yield getbabysmovement(date);
        const graviditygreaterthan8result = yield graviditygreaterthan8(date);
        const graviditylessthan8result = yield graviditylessthan8(date);
        //obstetric
        const convulsionsduringpregnancy = yield getconvulsions();
        const caesarean = yield getsurgery();
        const tearsthroughsphincter = yield gettearsthroughsphincter();
        const postpartiumhaemorrghage = yield getpostpartiumhaemorrghage();
        const stillbirths = yield getstillbirths();
        const prematuredeliveries = yield getprematuredeliveries();
        const lowbirthbabies = yield getlowbirthbabies();
        const babieswhodied = yield getbabieswhodied();
        const miscarriages = yield getmiscarriages();
        const breastfedbefore = yield getbreastfedbefore();
        const breastfeedingduration = yield getbreastfeedingduration();
        const breastfeedingproblems = yield getbreastfeedingproblems();
        //dailyhabitsandlifestyle
        const doyousmoke = yield getSmokers();
        const alcohol = yield getAlcohol();
        const threatened = yield getThreatened();
        const livewith = yield whodoyoulivewith();
        //medicalhistory
        const cough = yield getcough();
        const palpitations = yield getpalpitations();
        const difficultybreathing = yield getdifficultybreathing();
        const swellingfeet = yield getswellingoffeet();
        const chestpain = yield getchestpain();
        const epigastricpain = yield getepigastricpain();
        const severetiredness = yield getseveretiredness();
        const severeabdominalpain = yield getsevereabdominalpain();
        const persistentvomiting = yield getpersistentvomiting();
        const severediarrhoea = yield getseverediarrhoea();
        const dizziness = yield getdizziness();
        //urinary
        const painwithurination = yield getpainwithurination();
        const severeflankpain = yield getsevereflankpain();
        const bloodinurine = yield getbloodinurine();
        //gynaecological
        const vaginaldischarge = yield getvaginaldischarge();
        const deeppelvicpain = yield getdeeppelvicpain();
        const syphilis = yield getsyphilis();
        const persistentdrycough = yield getpersistentdrycough();
        const progressiveweightloss = yield getprogressiveweightloss();
        const nightsweats = yield getnightsweats();
        const diagnosedwithtuberculosis = yield getdiagnosedwithtuberculosis();
        const treatedTBpreviously = yield gettreatedTBpreviously();
        //pastmedicalhistory
        const heartdisease = yield getheartdisease();
        const anaemia = yield getanaemia();
        const kidneydisease = yield getkidneydisease();
        const sicklecell = yield getsicklecell();
        const diabetes = yield getdiabetes();
        const goitre = yield getgoitre();
        const hivaids = yield gethivaids();
        const otherseriouschronicillnesses = yield getotherseriouschronicillnesses();
        const hadsurgery = yield gethadsurgery();
        //drughistory
        const herbalremedies = yield getherbalremedies();
        const otcdrugs = yield getotcdrugs();
        const vitamins = yield getvitamins();
        const dietarysupplements = yield getdietarysupplements();
        const tetanus = yield gettetanus();
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
            breastfedbefore,
            breastfeedingduration,
            breastfeedingproblems,
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
exports.nationalgeneraldata = nationalgeneraldata;
const nationalreturnvisitdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getfeverreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.fever = ?
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
        rv.fever = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getheadachereturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.headache = ?
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
        rv.headache = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getcoughreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.cough = ?
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
        rv.cough = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getpalpitationsreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.palpitation = ?
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
        rv.palpitation = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getseveretirednessreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.severetirednesss = ?
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
        rv.severetirednesss = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getdifficultylyingflatreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.difficultylyingflat = ?
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
        rv.difficultylyingflat = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getdizzinessreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.dizziness = ?
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
        rv.dizziness = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getconvulsionsreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.convulsions = ?
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
        rv.convulsions = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getabdominalpainreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.severeabdominalpain = ?
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
        rv.severeabdominalpain = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getpainwithurinationreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.urinarypain = ?
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
        rv.urinarypain = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getbloodinurinereturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.bloodinurine = ?
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
        rv.bloodinurine = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getvaginaldischargereturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.vaginaldischarge = ?
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
        rv.vaginaldischarge = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getdeeppelvicpainreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.painduringsex = ?
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
        rv.painduringsex = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
    const getsyphilisreturn = () => __awaiter(void 0, void 0, void 0, function* () {
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
        rv.syphillis = ?
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
        rv.syphillis = ?
      `;
            const result = yield connection.execute(q, ["Yes"]);
            const result2 = yield connection.execute(q2, ["No"]);
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
        const fever = yield getfeverreturn();
        const headache = yield getheadachereturn();
        const cough = yield getcoughreturn();
        const palpitations = yield getpalpitationsreturn();
        const severetiredness = yield getseveretirednessreturn();
        const difficultylyingflat = yield getdifficultylyingflatreturn();
        const dizziness = yield getdizzinessreturn();
        const convulsionsduringpregnancy = yield getconvulsionsreturn();
        const abdominalpain = yield getabdominalpainreturn();
        const painwithurination = yield getpainwithurinationreturn();
        const bloodinurine = yield getbloodinurinereturn();
        const vaginaldischarge = yield getvaginaldischargereturn();
        const deeppelvicpain = yield getdeeppelvicpainreturn();
        const syphilis = yield getsyphilisreturn();
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
exports.nationalreturnvisitdata = nationalreturnvisitdata;
const getvisitdates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    const { id } = req.params;
    try {
        connection = yield db_1.default.getConnection();
        const q = `SELECT firstvisit_date,id
    FROM firstvisit
    WHERE patient_id = ?`;
        const q2 = `SELECT returnvisit_date,id
    FROM returnvisit
    WHERE patient_id = ?
    `;
        const [firstvisit] = yield connection.execute(q, [id]);
        const [returnvisit] = yield connection.execute(q2, [id]);
        res.status(200).json({ firstvisit, returnvisit });
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
exports.getvisitdates = getvisitdates;
const nationalscheduledata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM schedule;`;
        const q2 = `SELECT * FROM schedule WHERE missed = ?;`;
        const q3 = `SELECT * FROM schedule WHERE completed = ?;`;
        const q4 = `SELECT * FROM schedule WHERE upcoming = ?;`;
        const q5 = `SELECT * FROM schedule WHERE flagged = ?;`;
        const [number] = yield connection.execute(q);
        const [missed] = yield connection.execute(q2, [1]);
        const [completed] = yield connection.execute(q3, [1]);
        const [upcoming] = yield connection.execute(q4, [1]);
        const [flagged] = yield connection.execute(q5, [1]);
        res.status(200).json({
            number: number.length,
            missed: missed.length,
            completed: completed.length,
            upcoming: upcoming.length,
            flagged: flagged.length,
        });
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
exports.nationalscheduledata = nationalscheduledata;
//testresult
const nationaltestdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gethiv = () => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT * FROM testresult WHERE hiv = ?
      `;
            const q2 = `SELECT * FROM testresult WHERE hiv = ?
      `;
            const result = yield connection.execute(q, ["+ve"]);
            const result2 = yield connection.execute(q2, ["-ve"]);
            return {
                positive: result[0].length,
                negative: result2[0].length,
            };
        }
        catch (error) {
            connection.release();
            logger_1.default.error(error);
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    const getmalariarapid = () => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `SELECT * FROM testresult WHERE malariarapid = ?
      `;
            const q2 = `SELECT * FROM testresult WHERE malariarapid = ?
      `;
            const result = yield connection.execute(q, ["+ve"]);
            const result2 = yield connection.execute(q2, ["-ve"]);
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
        const hiv = yield gethiv();
        const malariarapid = yield getmalariarapid();
        res.status(200).json({
            hiv: hiv,
            malariarapid: malariarapid,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json(error);
    }
});
exports.nationaltestdata = nationaltestdata;
