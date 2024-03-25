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
