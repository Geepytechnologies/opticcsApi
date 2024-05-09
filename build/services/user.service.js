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
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const logger_1 = __importDefault(require("../logger"));
const patients_1 = require("../utils/patients");
class UserService {
    constructor(connection) {
        this.connection = connection;
    }
    getUserByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = new UserRepository_1.UserRepository(this.connection);
            try {
                const result = yield userRepo.getUserByPhone(phone);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getAllUsers(pageSize, offset, filter, state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = new UserRepository_1.UserRepository(this.connection);
            try {
                if (filter == "national") {
                    //general
                    logger_1.default.warn("national Users");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield userRepo.getAllUsersNationalwithdate(pageSize, offset, from, to);
                        const [count] = yield userRepo.getAllUsersNationalwithdateCount(from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield userRepo.getAllUsersNational(pageSize, offset);
                        const [count] = yield userRepo.getAllUsersNationalCount();
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "state") {
                    //state
                    logger_1.default.warn("state Users");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield userRepo.getAllUsersStatewithdate(pageSize, offset, state, from, to);
                        const [count] = yield userRepo.getAllUsersStatewithdateCount(state, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield userRepo.getAllUsersState(pageSize, offset, state);
                        const [count] = yield userRepo.getAllUsersStateCount(state);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "lga") {
                    //lga
                    logger_1.default.warn("lga Users");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield userRepo.getAllUsersLgawithdate(pageSize, offset, state, lga, from, to);
                        const [count] = yield userRepo.getAllUsersLgawithdateCount(state, lga, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield userRepo.getAllUsersLga(pageSize, offset, state, lga);
                        const [count] = yield userRepo.getAllUsersLgaCount(state, lga);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "healthfacility") {
                    //healthfacility
                    logger_1.default.warn("healthfacility Users");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield userRepo.getAllUsersHealthfacilitywithdate(pageSize, offset, state, healthfacility, from, to);
                        const [count] = yield userRepo.getAllUsersHealthfacilitywithdateCount(state, healthfacility, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield userRepo.getAllUsersHealthfacility(pageSize, offset, state, healthfacility);
                        const [count] = yield userRepo.getAllUsersHealthfacilityCount(state, healthfacility);
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
exports.UserService = UserService;
