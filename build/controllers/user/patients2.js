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
const DeliveryreportRepository_1 = require("../../repositories/DeliveryreportRepository");
const deliveryreport_service_1 = require("../../services/deliveryreport.service");
const TestresultRepository_1 = require("../../repositories/TestresultRepository");
const testresult_service_1 = require("../../services/testresult.service");
const error_1 = require("../../utils/error");
class PatientController {
    constructor() {
        this.createpatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const patientRepo = new PatientRepository_1.patientRepository(connection);
            const patientservice = new patients_service_1.PatientService(patientRepo, connection);
            try {
                yield connection.beginTransaction();
                const patientID = yield patientservice.createPatientFirstvisit(req.body);
                console.log(patientID, "patient creation");
                yield connection.commit();
                const newpatientrecord = yield patientservice.getnewlycreatedpatientrecord(patientID);
                const result = newpatientrecord[0];
                console.log(result[0] + " " + "newpatientrecord[0]");
                logger_1.default.info("Patient created successfully");
                res.status(201).json({
                    statusCode: "201",
                    message: "successful",
                    result,
                });
            }
            catch (error) {
                console.log("error from creating patient", error);
                if (error instanceof error_1.ANCCompletionError) {
                    res.status(500).json({
                        statusCode: "403",
                        error: error.message,
                    });
                    logger_1.default.error("ANC Completion Error:", error.message);
                }
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
            const patientservice = new patients_service_1.PatientService(patientRepo, connection);
            try {
                const result = yield patientservice.createPatientReturnvisit(req.body, healthpersonnel_id);
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
                    message: err.message || "Failed to create return visit for patient",
                    error: err.message,
                });
                console.error(err);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.deleteAPatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const connection = yield db_1.default.getConnection();
            const patientRepo = new PatientRepository_1.patientRepository(connection);
            const patientservice = new patients_service_1.PatientService(patientRepo, connection);
            try {
                const result = yield patientservice.deleteAPatient(id);
                res.status(200).json(result[0]);
            }
            catch (error) {
                logger_1.default.error(error);
                res.status(500).json(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getAllPatientsAndHealthworker = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = req.query.page || 1;
            const pageSize = 20;
            const offset = (page - 1) * pageSize;
            const connection = yield db_1.default.getConnection();
            const patientRepo = new PatientRepository_1.patientRepository(connection);
            const patientservice = new patients_service_1.PatientService(patientRepo, connection);
            try {
                const result = yield patientservice.getAllPatientsAndHealthworker(req.query, pageSize, offset);
                res.status(200).json({
                    statusCode: "200",
                    result: result.result,
                    count: result.count,
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
        this.createdeliveryreport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const deliveryReportRepo = new DeliveryreportRepository_1.DeliveryreportRepository(connection);
            const deliveryReportservice = new deliveryreport_service_1.DeliveryreportService(deliveryReportRepo);
            try {
                const result = yield deliveryReportservice.createdeliveryreport(req.body);
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res.status(500).json({ statusCode: "500", message: error });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getAllDeliveryreports = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const deliveryReportRepo = new DeliveryreportRepository_1.DeliveryreportRepository(connection);
            const deliveryReportservice = new deliveryreport_service_1.DeliveryreportService(deliveryReportRepo);
            try {
                const result = yield deliveryReportservice.getAllDeliveryreports();
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res.status(500).json({ statusCode: "500", message: error });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getAllDeliveryreportsByAWorker = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const deliveryReportRepo = new DeliveryreportRepository_1.DeliveryreportRepository(connection);
            const deliveryReportservice = new deliveryreport_service_1.DeliveryreportService(deliveryReportRepo);
            const { id } = req.user;
            try {
                const result = deliveryReportservice.getAllDeliveryreportsByAWorker(id);
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res.status(500).json({ statusCode: "500", message: error });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getAPatientsDeliveryreport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const deliveryReportRepo = new DeliveryreportRepository_1.DeliveryreportRepository(connection);
            const deliveryReportservice = new deliveryreport_service_1.DeliveryreportService(deliveryReportRepo);
            const patient_id = req.query.patient_id;
            try {
                const result = yield deliveryReportservice.getAPatientsDeliveryreport(patient_id);
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res.status(500).json({ statusCode: "500", message: error });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.createTest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const testResultRepo = new TestresultRepository_1.TestresultRepository(connection);
            const testResultservice = new testresult_service_1.TestresultService(testResultRepo);
            try {
                const result = yield testResultservice.createTest(req.body);
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res.status(500).json({ statusCode: "500", message: error });
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
