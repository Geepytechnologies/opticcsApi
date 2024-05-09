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
exports.getAllHealthfacility = exports.getHealthfacilityAccountsForLGA = exports.getHealthfacilityAccountsFiltered = exports.getHealthfacilityUserAccounts = exports.getHealthfacilityAccounts = exports.verifyHealthWorker = exports.createHealthfacilityUserAccount = exports.createHealthfacilityAccount = void 0;
const db_1 = __importDefault(require("../../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("../../../logger"));
const HealthFacilityRepository_1 = require("../../../repositories/HealthFacilityRepository");
const healthfacility_1 = require("../../../validations/healthfacility");
const HealthPersonnelRepository_1 = require("../../../repositories/HealthPersonnelRepository");
const BaseRepository_1 = __importDefault(require("../../../repositories/BaseRepository"));
const healthfacility_service_1 = require("../../../services/healthfacility.service");
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
    console.log(values);
    // const { error } = healthfacilityvalidation.createAccount(req.body);
    // console.log(error);
    // if (error) {
    //   return res.status(400).json({
    //     statusCode: "400",
    //     message: error.details[0].message.toUpperCase(),
    //     result: null,
    //   });
    // }
    try {
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const accountExists = yield hfRepository.checkIfAccountExists(healthfacilityID);
        if (accountExists) {
            res.status(409).json("healthfacility with ID already exists");
        }
        else {
            const result = yield hfRepository.createHealthFacilityAccount(values);
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
    const { ward, staffname, staffid, gender, lga, state, cadre, phone, email, userid, password, healthfacility, } = req.body;
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
        healthfacility,
    ];
    // const { error } = healthfacilityvalidation.createUserAccount(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     statusCode: "400",
    //     message: error.details[0].message.toUpperCase(),
    //     result: null,
    //   });
    // }
    try {
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const accountExists = yield hfRepository.checkIfUserAccountExists(userid, hashedpassword);
        if (accountExists) {
            res.status(409).json("healthfacility user already exists");
        }
        else {
            const result = yield hfRepository.createHealthFacilityUserAccount(values);
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
        const connection = yield BaseRepository_1.default.getConnection();
        const hpRepository = new HealthPersonnelRepository_1.HealthPersonnelRepository(connection);
        const result = yield hpRepository.updateHealthpersonnelverification(id);
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
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const { state, lga } = req.query;
        const result = yield hfRepository.getHealthFacilityUserAccountUsingStateAndLga(
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
    try {
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const result = yield hfRepository.getHealthFacilityAccounts();
        res.status(200).json(result[0]);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json(error);
    }
});
exports.getHealthfacilityAccounts = getHealthfacilityAccounts;
const getHealthfacilityAccountsForLGA = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lga = req.query.lga;
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const result = yield hfRepository.getHealthFacilityAccountsForLGA(lga);
        res.status(200).json(result[0]);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json(error);
    }
});
exports.getHealthfacilityAccountsForLGA = getHealthfacilityAccountsForLGA;
const getHealthfacilityUserAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const result = yield hfRepository.getHealthfacilityUserAccounts();
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getHealthfacilityUserAccounts = getHealthfacilityUserAccounts;
const getAllHealthfacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    const state = req.query.state || "";
    const lga = req.query.lga || "";
    const healthfacility = req.query.healthfacility || "";
    const from = req.query.from || "";
    const to = req.query.to || "";
    const filter = req.query.filter;
    console.log("filter: " + filter);
    const connection = yield db_1.default.getConnection();
    const hfRepo = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
    const hfService = new healthfacility_service_1.HealthfacilityService(hfRepo);
    try {
        const result = yield hfService.getAllHealthfacility(pageSize, offset, filter, state, lga, healthfacility, from, to);
        res.status(200).json({ result: result.result, count: result.count });
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
exports.getAllHealthfacility = getAllHealthfacility;
