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
const db_1 = __importDefault(require("../config/db"));
const WardRepsitory_1 = require("../repositories/WardRepsitory");
const ward_service_1 = require("../services/ward.service");
const ward_1 = require("../validations/ward");
class WardController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const wardRepo = new WardRepsitory_1.WardRepository(connection);
            const wardservice = new ward_service_1.WardService(wardRepo);
            const { error } = ward_1.wardvalidation.create(req.body);
            if (error) {
                return res.status(400).json({
                    statusCode: "400",
                    message: error.details[0].message.toUpperCase(),
                });
            }
            try {
                const result = yield wardservice.create(req.body);
                res.status(201).json({ statusCode: "201", result: result });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ statusCode: "500", message: "Error creating ward" });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getAllWards = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const wardRepo = new WardRepsitory_1.WardRepository(connection);
            const wardservice = new ward_service_1.WardService(wardRepo);
            try {
                const result = yield wardservice.getAllWards();
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ statusCode: "500", message: "Error getting wards" });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getAllWardsForState = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const wardRepo = new WardRepsitory_1.WardRepository(connection);
            const wardservice = new ward_service_1.WardService(wardRepo);
            const state = req.query.state;
            try {
                const result = yield wardservice.getAllWardsForState(state);
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ statusCode: "500", message: "Error getting wards for state" });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
        this.getAllWardsForLGA = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const wardRepo = new WardRepsitory_1.WardRepository(connection);
            const wardservice = new ward_service_1.WardService(wardRepo);
            const lga = req.query.lga;
            try {
                const result = yield wardservice.getAllWardsForState(lga);
                res.status(200).json({ statusCode: "200", result: result });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ statusCode: "500", message: "Error getting wards for lga" });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
}
exports.default = new WardController();
