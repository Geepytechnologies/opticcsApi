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
exports.NationalRepository = void 0;
const logger_1 = __importDefault(require("../logger"));
class NationalRepository {
    constructor(connection) {
        this.getfeverreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.fever = ? AND rv.anc = ?
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
        rv.fever = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getheadachereturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.headache = ? AND rv.anc = ?
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
        rv.headache = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getcoughreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.cough = ? AND rv.anc = ?
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
        rv.cough = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getpalpitationsreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.palpitation = ? AND rv.anc = ?
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
        rv.palpitation = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getseveretirednessreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.severetirednesss = ? AND rv.anc = ?
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
        rv.severetirednesss = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getdifficultylyingflatreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.difficultylyingflat = ? AND rv.anc = ?
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
        rv.difficultylyingflat = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getdizzinessreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.dizziness = ? AND rv.anc = ?
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
        rv.dizziness = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getconvulsionsreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.convulsions = ? AND rv.anc = ?
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
        rv.convulsions = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getabdominalpainreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.severeabdominalpain = ? AND rv.anc = ?
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
        rv.severeabdominalpain = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getpainwithurinationreturn = (anc) => __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.urinarypain = ? AND rv.anc = ?
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
        rv.urinarypain = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.graviditygreaterthan8 = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8`;
                const result = yield this.connection.execute(q);
                return result[0].length;
            }
            catch (error) {
                console.log(error);
            }
        });
        this.graviditylessthan8 = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) < 8`;
                const result = yield this.connection.execute(q);
                return result[0].length;
            }
            catch (error) {
                console.log(error);
            }
        });
        // getedd = async (req: Request, res: Response) => {
        //   try {
        //     const q = `SELECT
        //       quarter,
        //       COUNT(*) AS number
        //     FROM (
        //       SELECT
        //         edd,
        //         CASE
        //           WHEN MONTH(edd) BETWEEN 1 AND 3 THEN 'Q1'
        //           WHEN MONTH(edd) BETWEEN 4 AND 6 THEN 'Q2'
        //           WHEN MONTH(edd) BETWEEN 7 AND 9 THEN 'Q3'
        //           WHEN MONTH(edd) BETWEEN 10 AND 12 THEN 'Q4'
        //         END AS quarter,
        //         ,lga,healthFacility
        //       FROM personalinformation
        //     ) AS subquery
        //     GROUP BY quarter
        //     ORDER BY MIN(edd);
        //   `;
        //     const result:any = await this.connection.execute(q);
        //     res.status(200).json(result[0]);
        //   } catch (error) {
        //     res.status(500).json(error);
        //   }
        // };
        this.getedd2 = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q);
                return result[0];
            }
            catch (error) {
                console.log({ edd_error: error });
            }
        });
        this.getparity = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q1 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) <= 24;
    `;
                const q2 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) > 24;
    `;
                const less = yield this.connection.execute(q1);
                const greater = yield this.connection.execute(q2);
                return { less: less[0].length, greater: greater[0].length };
            }
            catch (error) {
                throw error;
            }
        });
        this.getbabysmovement = () => __awaiter(this, void 0, void 0, function* () {
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
                const yes = yield this.connection.execute(q1, ["yes"]);
                const no = yield this.connection.execute(q2, ["no"]);
                const dontknow = yield this.connection.execute(q3, ["i don't know"]);
                const notapplicable = yield this.connection.execute(q4, [
                    "not applicable",
                ]);
                return {
                    yes: yes[0].length,
                    no: no[0].length,
                    dontknow: dontknow[0].length,
                    notapplicable: notapplicable[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getfirstbabymovement = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q1 = `SELECT *
        FROM personalinformation
        WHERE doyouknowdateoffirstbabymovement = ?;
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
                const yes = yield this.connection.execute(q1, ["yes"]);
                const no = yield this.connection.execute(q2, ["no"]);
                const dontknow = yield this.connection.execute(q3, ["i don't know"]);
                const notapplicable = yield this.connection.execute(q4, [
                    "not applicable",
                ]);
                return {
                    yes: yes[0].length,
                    no: no[0].length,
                    dontknow: dontknow[0].length,
                    notapplicable: notapplicable[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        //obstetrichistory
        this.getconvulsions = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const q2 = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
                const result2 = yield this.connection.execute(q2, ["yes"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getsurgery = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const q2 = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
                const result2 = yield this.connection.execute(q2, ["yes"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.gettearsthroughsphincter = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const q2 = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getpostpartiumhaemorrghage = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getstillbirths = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getprematuredeliveries = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getlowbirthbabies = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getbabieswhodied = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getmiscarriages = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
                const q2 = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getbreastfedbefore = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
                const q2 = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getbreastfeedingduration = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
                const q2 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
                const q3 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
                const result = yield this.connection.execute(q, ["< 6 months"]);
                const result2 = yield this.connection.execute(q2, ["6 months"]);
                const result3 = yield this.connection.execute(q3, ["> 6 months"]);
                return {
                    less: result[0].length,
                    equal: result2[0].length,
                    greater: result3[0].length,
                };
            }
            catch (error) { }
        });
        this.getbreastfeedingproblems = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
                const q2 = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        //dailyhabits and lifestyle
        this.getSmokers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
                const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getAlcohol = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
                const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.getThreatened = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
                const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
                const result = yield this.connection.execute(q, ["yes"]);
                const result2 = yield this.connection.execute(q2, ["no"]);
                return { yes: result[0].length, no: result2[0].length };
            }
            catch (error) { }
        });
        this.whodoyoulivewith = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
                const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
                const q3 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
                const q4 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
                const q5 = `SELECT * FROM dailyhabitsandlifestyle WHERE specifywhodoyoulivewith IS NOT NULL AND specifywhodoyoulivewith <> '';`;
                const result = yield this.connection.execute(q, ["Partner"]);
                const result2 = yield this.connection.execute(q2, ["Relative"]);
                const result3 = yield this.connection.execute(q3, ["Alone"]);
                const result4 = yield this.connection.execute(q4, ["Friend"]);
                const result5 = yield this.connection.execute(q5);
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
        this.getcough = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getpalpitations = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getdifficultybreathing = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getswellingoffeet = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getchestpain = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getepigastricpain = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getseveretiredness = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getsevereabdominalpain = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getpersistentvomiting = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getseverediarrhoea = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getdizziness = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        //urinary
        this.getpainwithurination = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getsevereflankpain = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getbloodinurine = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        //gynaelogical
        this.getvaginaldischarge = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getdeeppelvicpain = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getsyphilis = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getpersistentdrycough = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getprogressiveweightloss = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getnightsweats = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getdiagnosedwithtuberculosis = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.gettreatedTBpreviously = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        //pastmedicalhistory
        this.getheartdisease = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getanaemia = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getkidneydisease = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getsicklecell = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getdiabetes = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getgoitre = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.gethivaids = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getotherseriouschronicillnesses = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.gethadsurgery = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        //drug history
        this.getherbalremedies = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getotcdrugs = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getvitamins = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.getdietarysupplements = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.gettetanus = () => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.execute(q, ["Yes"]);
                const result2 = yield this.connection.execute(q2, ["No"]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) { }
        });
        this.connection = connection;
    }
    getNationalAdminByUserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM nationaladmin WHERE userid = ?`;
            try {
                const result = yield this.connection.execute(q, [userID]);
                return result;
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
    createRefresh(refreshToken, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `UPDATE nationaladmin SET refreshtoken = ? WHERE userid = ?`;
            try {
                console.log("im using %d for refresh", this.connection.threadId);
                yield this.connection.execute(q, [refreshToken, userID]);
            }
            catch (error) {
                logger_1.default.error(error);
            }
            finally {
                console.log("i released %d in refresh", this.connection.threadId);
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    getbloodinurinereturn(anc) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.bloodinurine = ? AND rv.anc = ?
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
        rv.bloodinurine = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getvaginaldischargereturn(anc) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.vaginaldischarge = ? AND rv.anc = ?
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
        rv.vaginaldischarge = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getdeeppelvicpainreturn(anc) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.painduringsex = ? AND rv.anc = ?
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
        rv.painduringsex = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getsyphilisreturn(anc) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = anc || 2;
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
        rv.syphillis = ? AND rv.anc = ?
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
        rv.syphillis = ? AND rv.anc = ?
      `;
                const result = yield this.connection.execute(q, ["Yes", query]);
                const result2 = yield this.connection.execute(q2, ["No", query]);
                return {
                    yes: result[0].length,
                    no: result2[0].length,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.NationalRepository = NationalRepository;
