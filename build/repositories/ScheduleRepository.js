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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRepository = void 0;
const schedule_1 = require("../queries/user/schedule");
class ScheduleRepository {
    constructor(connection) {
        this.connection = connection;
    }
    createSchedule() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleNational(pageSize, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleNational(pageSize, offset);
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllScheduleNationalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleNationalCount();
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllScheduleNationalwithdate(pageSize, offset, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleNationalwithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleNationalwithdateCount(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleNationalwithdateCount();
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleState(pageSize, offset, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleState(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleStateCount(state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleStateCount();
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleStatewithdate(pageSize, offset, state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleStatewithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleStatewithdateCount(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleStatewithdateCount();
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleLga(pageSize, offset, state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleLga(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleLgaCount(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleLgaCount();
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleLgawithdate(pageSize, offset, state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleLgawithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleLgawithdateCount(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleLgawithdateCount();
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleHealthfacility(pageSize, offset, state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleHealthfacility(pageSize, offset);
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleHealthfacilityCount(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleHealthfacilityCount();
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleHealthfacilitywithdate(pageSize, offset, state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleHealthfacilitywithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllScheduleHealthfacilitywithdateCount(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = schedule_1.ScheduleQueries.getAllScheduleHealthfacilitywithdateCount();
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.ScheduleRepository = ScheduleRepository;
