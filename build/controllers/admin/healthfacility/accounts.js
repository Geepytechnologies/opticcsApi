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
exports.getHealthfacilityAccountsFiltered = exports.getHealthfacilityUserAccounts = exports.getHealthfacilityAccounts = exports.verifyHealthWorker = exports.createHealthfacilityUserAccount = exports.createHealthfacilityAccount = void 0;
const db_1 = __importDefault(require("../../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("../../../logger"));
const HealthFacilityRepository_1 = require("../../../repositories/HealthFacilityRepository");
const healthfacility_1 = require("../../../validations/healthfacility");
const HealthPersonnelRepository_1 = require("../../../repositories/HealthPersonnelRepository");
const createHealthfacilityAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ward, state, lga, healthfacilityname, healthfacilityID, officeaddress, phone, email, } = req.body;
    const values = [
        ward,
        healthfacilityname,
        lga,
        state,
        healthfacilityID,
        officeaddress,
        phone,
        email,
    ];
    const { error } = healthfacility_1.healthfacilityvalidation.createAccount(req.body);
    if (error) {
        return res.status(400).json({
            statusCode: "400",
            message: error.details[0].message.toUpperCase(),
            result: null,
        });
    }
    try {
        const accountExists = yield HealthFacilityRepository_1.HealthFacilityRepository.checkIfAccountExists(healthfacilityID);
        if (accountExists) {
            res.status(409).json("healthfacility with ID already exists");
        }
        else {
            const result = yield HealthFacilityRepository_1.HealthFacilityRepository.createHealthFacilityAccount(values);
            res
                .status(201)
                .json({ statusCode: "201", message: "successful", result: result[0] });
        }
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).json({
            statusCode: "500",
            message: "can't create healthfacility account",
            error: err,
        });
    }
});
exports.createHealthfacilityAccount = createHealthfacilityAccount;
const createHealthfacilityUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ward, staffname, staffid, gender, lga, state, cadre, phone, email, userid, password, healthfacilityid, } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedpassword = bcryptjs_1.default.hashSync(password, salt);
    const values = [
        ward,
        staffname,
        staffid,
        gender,
        lga,
        state,
        cadre,
        phone,
        email,
        userid,
        hashedpassword,
        healthfacilityid,
    ];
    const { error } = healthfacility_1.healthfacilityvalidation.createUserAccount(req.body);
    if (error) {
        return res.status(400).json({
            statusCode: "400",
            message: error.details[0].message.toUpperCase(),
            result: null,
        });
    }
    try {
        const accountExists = yield HealthFacilityRepository_1.HealthFacilityRepository.checkIfUserAccountExists(userid, hashedpassword);
        if (accountExists) {
            res.status(409).json("healthfacility user already exists");
        }
        else {
            const result = yield HealthFacilityRepository_1.HealthFacilityRepository.createHealthFacilityUserAccount(values);
            res
                .status(201)
                .json({ statusCode: "201", message: "successful", result: result[0] });
        }
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).json({
            statusCode: "500",
            message: "can't create healthfacility user account",
            error: err,
        });
    }
});
exports.createHealthfacilityUserAccount = createHealthfacilityUserAccount;
const verifyHealthWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield HealthPersonnelRepository_1.HealthPersonnelRepository.updateHealthpersonnelverification(id);
        res
            .status(201)
            .json({ statusCode: "201", message: "successful", result: result[0] });
    }
    catch (err) {
        res.status(500).json({
            statusCode: "500",
            message: "failure in verifying healthworker",
            error: err,
        });
    }
});
exports.verifyHealthWorker = verifyHealthWorker;
const getHealthfacilityAccountsFiltered = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = healthfacility_1.healthfacilityvalidation.gethealthfacilityaccountsfiltered(req.query);
    if (error) {
        return res.status(400).json({
            statusCode: "400",
            message: error.details[0].message.toUpperCase(),
            result: null,
        });
    }
    try {
        const { state, lga } = req.query;
        const result = yield HealthFacilityRepository_1.HealthFacilityRepository.getHealthFacilityUserAccountUsingStateAndLga(
        //@ts-ignore
        state, lga);
        res.status(200).json(result[0]);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json(error);
    }
});
exports.getHealthfacilityAccountsFiltered = getHealthfacilityAccountsFiltered;
const getHealthfacilityAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM healthfacilityaccount`;
        const result = yield connection.execute(q);
        res.status(200).json(result[0]);
        connection.release();
    }
    catch (error) {
        logger_1.default.error(error);
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getHealthfacilityAccounts = getHealthfacilityAccounts;
const getHealthfacilityUserAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM healthfacilityadmin`;
        const result = yield connection.execute(q);
        res.status(200).json(result[0]);
        connection.release();
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
exports.getHealthfacilityUserAccounts = getHealthfacilityUserAccounts;