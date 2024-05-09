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
const ScheduleRepository_1 = require("../../repositories/ScheduleRepository");
const schedule_service_1 = require("../../services/schedule.service");
class ScheduleController {
    getAllSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const scheduleRepo = new ScheduleRepository_1.ScheduleRepository(connection);
            const scheduleService = new schedule_service_1.ScheduleService(scheduleRepo);
            try {
                const result = yield scheduleService.getAllSchedule(pageSize, offset, filter, state, lga, healthfacility, from, to);
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
    }
}
exports.default = new ScheduleController();
