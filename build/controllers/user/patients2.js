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
const db_1 = __importDefault(require("../../config/db"));
const logger_1 = __importDefault(require("../../logger"));
const patients_service_1 = require("../../services/patients.service");
const PatientRepository_1 = require("../../repositories/PatientRepository");
class PatientController {
    constructor() {
        this.createpatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const patientRepo = new PatientRepository_1.patientRepository(connection);
            const patientservice = new patients_service_1.PatientService(patientRepo);
            try {
                yield connection.beginTransaction();
                const patientID = yield patientservice.createPatientFirstvisit(req.body);
                yield connection.commit();
                const newpatientrecord = yield patientservice.getnewlycreatedpatientrecord(patientID);
                const result = newpatientrecord[0];
                logger_1.default.info("Patient created successfully");
                res.status(201).json({
                    statusCode: "201",
                    message: "successful",
                    result,
                });
            }
            catch (error) {
                console.log("error from creating patient", error);
                const errorResponse = {
                    statusCode: error.statusCode || 500,
                    error: Object.assign({}, error),
                };
                if (connection) {
                    try {
                        yield connection.rollback();
                        logger_1.default.warn("creating patient connection rolled back");
                    }
                    catch (rollbackError) {
                        console.error("Rollback error:", rollbackError);
                    }
                }
                res.status(500).json({
                    statusCode: error.statusCode || 500,
                    error: error.message,
                });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.createPatientEveryVisit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const healthpersonnel_id = req.user.id;
            const patientRepo = new PatientRepository_1.patientRepository(connection);
            const patientservice = new patients_service_1.PatientService(patientRepo);
            try {
                const result = yield patientservice.createPatientReturnvisit(req.body);
                const returnvisitid = result[0];
                res.status(201).json({
                    statusCode: "201",
                    message: "created successfully",
                    result: {
                        returnvisitid,
                    },
                });
            }
            catch (err) {
                res.status(500).json({
                    statusCode: "500",
                    message: "Failed to create return visit for patient",
                    error: err,
                });
                console.error(err);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
}
exports.default = new PatientController();
