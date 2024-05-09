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
exports.ScheduleService = void 0;
const logger_1 = __importDefault(require("../logger"));
const patients_1 = require("../utils/patients");
class ScheduleService {
    constructor(ScheduleRepo) {
        this.scheduleRepository = ScheduleRepo;
    }
    getAllSchedule(pageSize, offset, filter, state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (filter == "national") {
                    //general
                    logger_1.default.warn("national schedule");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.scheduleRepository.getAllScheduleNationalwithdate(pageSize, offset, from, to);
                        const [count] = yield this.scheduleRepository.getAllScheduleNationalwithdateCount(from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.scheduleRepository.getAllScheduleNational(pageSize, offset);
                        const [count] = yield this.scheduleRepository.getAllScheduleNationalCount();
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "state") {
                    //state
                    logger_1.default.warn("state schedule");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.scheduleRepository.getAllScheduleStatewithdate(pageSize, offset, state, from, to);
                        const [count] = yield this.scheduleRepository.getAllScheduleStatewithdateCount(state, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.scheduleRepository.getAllScheduleState(pageSize, offset, state);
                        const [count] = yield this.scheduleRepository.getAllScheduleStateCount(state);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "lga") {
                    //lga
                    logger_1.default.warn("lga schedule");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.scheduleRepository.getAllScheduleLgawithdate(pageSize, offset, state, lga, from, to);
                        const [count] = yield this.scheduleRepository.getAllScheduleLgawithdateCount(state, lga, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.scheduleRepository.getAllScheduleLga(pageSize, offset, state, lga);
                        const [count] = yield this.scheduleRepository.getAllScheduleLgaCount(state, lga);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "healthfacility") {
                    //healthfacility
                    logger_1.default.warn("healthfacility schedule");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.scheduleRepository.getAllScheduleHealthfacilitywithdate(pageSize, offset, state, healthfacility, from, to);
                        const [count] = yield this.scheduleRepository.getAllScheduleHealthfacilitywithdateCount(state, healthfacility, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.scheduleRepository.getAllScheduleHealthfacility(pageSize, offset, state, healthfacility);
                        const [count] = yield this.scheduleRepository.getAllScheduleHealthfacilityCount(state, healthfacility);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.ScheduleService = ScheduleService;
