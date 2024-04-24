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
const patients_service_1 = require("../../../services/patients.service");
const PatientRepository_1 = require("../../../repositories/PatientRepository");
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
            const state = req.query.state || "";
            const lga = req.query.lga || "";
            const healthfacility = req.query.healthfacility || "";
            const from = req.query.from || "";
            const to = req.query.to || "";
            console.log({
                state: state,
                lga: lga,
                healthfacility: healthfacility,
                from: from,
                to: to,
            });
            const connection = yield db_1.default.getConnection();
            const patientRepo = new PatientRepository_1.patientRepository(connection);
            const patientservice = new patients_service_1.PatientService(patientRepo);
            try {
                const result = yield patientservice.numberofwomenwith4visits(state, lga, healthfacility, from, to);
                res.status(200).json(result);
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
        this.nationalgeneraldata = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const repo = new NationalRepository_1.NationalRepository(connection);
            const service = new national_service_1.NationalService(repo);
            try {
                const result = yield service.nationalgeneraldata(req.query);
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
        this.nationalIndicatorOutcomedata = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const repo = new NationalRepository_1.NationalRepository(connection);
            const service = new national_service_1.NationalService(repo);
            try {
                const result = yield service.nationalgeneraldata(req.query);
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
        this.nationalIntermediateResult1data = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const repo = new NationalRepository_1.NationalRepository(connection);
            const service = new national_service_1.NationalService(repo);
            try {
                const result = yield service.nationalgeneraldata(req.query);
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
