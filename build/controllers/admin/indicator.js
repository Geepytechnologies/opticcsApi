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
const IndicatorRepository_1 = require("../../repositories/IndicatorRepository");
const db_1 = __importDefault(require("../../config/db"));
const indicator_service_1 = require("../../services/indicator.service");
class IndicatorController {
    constructor() {
        this.intermediateResult1 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const state = req.query.state || "";
            const lga = req.query.lga || "";
            const healthfacility = req.query.healthfacility || "";
            const from = req.query.from || "";
            const to = req.query.to || "";
            const connection = yield db_1.default.getConnection();
            const indicatorRepo = new IndicatorRepository_1.IndicatorRepository(connection);
            const indicatorService = new indicator_service_1.IndicatorService(indicatorRepo);
            try {
                const result = yield indicatorService.intermediateResult1(state, lga, healthfacility, from, to);
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
        this.intermediateResult2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
        this.intermediateResult3 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
        this.activity1 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
        this.activity2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
    }
}
exports.default = new IndicatorController();
