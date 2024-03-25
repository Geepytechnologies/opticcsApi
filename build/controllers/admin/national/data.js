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
const db_1 = __importDefault(require("../../../config/db"));
const logger_1 = __importDefault(require("../../../logger"));
const NationalRepository_1 = require("../../../repositories/NationalRepository");
const national_service_1 = require("../../../services/national.service");
class NationalDataController {
    constructor() {
        this.nationalreturnvisitdata = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const nationalRepo = new NationalRepository_1.NationalRepository(connection);
            const nationalservice = new national_service_1.NationalService(nationalRepo);
            const anc = req.query.anc;
            try {
                const result = yield nationalservice.nationalreturnvisitdata(anc);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.numberofwomenwith4visits = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        this.graviditygreaterthan8 = (connection) => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.graviditylessthan8 = (connection) => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.getedd = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.getedd2 = (connection) => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.getparity = (connection) => __awaiter(this, void 0, void 0, function* () {
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
                throw error;
            }
        });
        this.getbabysmovement = (connection) => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.getfirstbabymovement = (connection) => __awaiter(this, void 0, void 0, function* () {
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
        });
        //obstetrichistory
        this.getconvulsions = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const q2 = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
                const result2 = yield connection.execute(q2, ["yes"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getsurgery = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const q2 = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
                const result2 = yield connection.execute(q2, ["yes"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.gettearsthroughsphincter = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const q2 = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getpostpartiumhaemorrghage = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getstillbirths = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getprematuredeliveries = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getlowbirthbabies = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getbabieswhodied = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getmiscarriages = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getbreastfedbefore = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
                const q2 = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
                const result = yield connection.execute(q, ["Yes"]);
                const result2 = yield connection.execute(q2, ["No"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getbreastfeedingduration = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getbreastfeedingproblems = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
                const q2 = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
                const result = yield connection.execute(q, ["Yes"]);
                const result2 = yield connection.execute(q2, ["No"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        //dailyhabits and lifestyle
        this.getSmokers = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
                const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getAlcohol = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
                const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getThreatened = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
                const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
                const result = yield connection.execute(q, ["yes"]);
                const result2 = yield connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.whodoyoulivewith = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        //medicalhistory
        this.getcough = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getpalpitations = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getdifficultybreathing = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getswellingoffeet = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getchestpain = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getepigastricpain = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getseveretiredness = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getsevereabdominalpain = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getpersistentvomiting = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getseverediarrhoea = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getdizziness = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        //urinary
        this.getpainwithurination = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getsevereflankpain = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getbloodinurine = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        //gynaelogical
        this.getvaginaldischarge = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getdeeppelvicpain = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getsyphilis = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getpersistentdrycough = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getprogressiveweightloss = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getnightsweats = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getdiagnosedwithtuberculosis = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.gettreatedTBpreviously = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        //pastmedicalhistory
        this.getheartdisease = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getanaemia = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getkidneydisease = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getsicklecell = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getdiabetes = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getgoitre = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.gethivaids = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getotherseriouschronicillnesses = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.gethadsurgery = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        //drug history
        this.getherbalremedies = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getotcdrugs = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getvitamins = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.getdietarysupplements = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.gettetanus = (connection) => __awaiter(this, void 0, void 0, function* () {
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
            catch (error) { }
        });
        this.nationalgeneraldata = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const date = req.query.date || null;
            const connection = yield db_1.default.getConnection();
            try {
                //personalinformation
                const edd = yield this.getedd2(connection);
                const firstbabymovement = yield this.getfirstbabymovement(connection);
                const parity = yield this.getparity(connection);
                const babysmovement = yield this.getbabysmovement(connection);
                const graviditygreaterthan8result = yield this.graviditygreaterthan8(connection);
                const graviditylessthan8result = yield this.graviditylessthan8(connection);
                //obstetric
                const convulsionsduringpregnancy = yield this.getconvulsions(connection);
                const caesarean = yield this.getsurgery(connection);
                const tearsthroughsphincter = yield this.gettearsthroughsphincter(connection);
                const postpartiumhaemorrghage = yield this.getpostpartiumhaemorrghage(connection);
                const stillbirths = yield this.getstillbirths(connection);
                const prematuredeliveries = yield this.getprematuredeliveries(connection);
                const lowbirthbabies = yield this.getlowbirthbabies(connection);
                const babieswhodied = yield this.getbabieswhodied(connection);
                const miscarriages = yield this.getmiscarriages(connection);
                const breastfedbefore = yield this.getbreastfedbefore(connection);
                const breastfeedingduration = yield this.getbreastfeedingduration(connection);
                const breastfeedingproblems = yield this.getbreastfeedingproblems(connection);
                //dailyhabitsandlifestyle
                const doyousmoke = yield this.getSmokers(connection);
                const alcohol = yield this.getAlcohol(connection);
                const threatened = yield this.getThreatened(connection);
                const livewith = yield this.whodoyoulivewith(connection);
                //medicalhistory
                const cough = yield this.getcough(connection);
                const palpitations = yield this.getpalpitations(connection);
                const difficultybreathing = yield this.getdifficultybreathing(connection);
                const swellingfeet = yield this.getswellingoffeet(connection);
                const chestpain = yield this.getchestpain(connection);
                const epigastricpain = yield this.getepigastricpain(connection);
                const severetiredness = yield this.getseveretiredness(connection);
                const severeabdominalpain = yield this.getsevereabdominalpain(connection);
                const persistentvomiting = yield this.getpersistentvomiting(connection);
                const severediarrhoea = yield this.getseverediarrhoea(connection);
                const dizziness = yield this.getdizziness(connection);
                //urinary
                const painwithurination = yield this.getpainwithurination(connection);
                const severeflankpain = yield this.getsevereflankpain(connection);
                const bloodinurine = yield this.getbloodinurine(connection);
                //gynaecological
                const vaginaldischarge = yield this.getvaginaldischarge(connection);
                const deeppelvicpain = yield this.getdeeppelvicpain(connection);
                const syphilis = yield this.getsyphilis(connection);
                const persistentdrycough = yield this.getpersistentdrycough(connection);
                const progressiveweightloss = yield this.getprogressiveweightloss(connection);
                const nightsweats = yield this.getnightsweats(connection);
                const diagnosedwithtuberculosis = yield this.getdiagnosedwithtuberculosis(connection);
                const treatedTBpreviously = yield this.gettreatedTBpreviously(connection);
                //pastmedicalhistory
                const heartdisease = yield this.getheartdisease(connection);
                const anaemia = yield this.getanaemia(connection);
                const kidneydisease = yield this.getkidneydisease(connection);
                const sicklecell = yield this.getsicklecell(connection);
                const diabetes = yield this.getdiabetes(connection);
                const goitre = yield this.getgoitre(connection);
                const hivaids = yield this.gethivaids(connection);
                const otherseriouschronicillnesses = yield this.getotherseriouschronicillnesses(connection);
                const hadsurgery = yield this.gethadsurgery(connection);
                //drughistory
                const herbalremedies = yield this.getherbalremedies(connection);
                const otcdrugs = yield this.getotcdrugs(connection);
                const vitamins = yield this.getvitamins(connection);
                const dietarysupplements = yield this.getdietarysupplements(connection);
                const tetanus = yield this.gettetanus(connection);
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
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getvisitdates = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                res.status(500).json(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.nationalscheduledata = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                res.status(500).json(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        //testresult
        this.nationaltestdata = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gethiv = () => __awaiter(this, void 0, void 0, function* () {
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
            const getmalariarapid = () => __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.default = new NationalDataController();
