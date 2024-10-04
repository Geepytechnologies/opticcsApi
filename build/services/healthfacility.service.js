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
exports.HealthfacilityService = void 0;
const logger_1 = __importDefault(require("../logger"));
const generators_1 = require("../utils/generators");
const patients_1 = require("../utils/patients");
class HealthfacilityService {
    constructor(HfRepository) {
        this.hfRepository = HfRepository;
    }
    generateUniqueCredentials(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = "IANC" + generators_1.Generators.generateRandomNumberString(8);
            const password = generators_1.Generators.generateRandomString(10);
            try {
                // Check if the generated username already exists in the database
                const [results] = yield this.hfRepository.getHealthfacilityUserAccountByUserID(username);
                if (Array.isArray(results)) {
                    if (results.length > 0) {
                        this.generateUniqueCredentials(callback);
                    }
                    else {
                        callback(null, { username, password });
                    }
                }
            }
            catch (err) {
                callback(err, null);
            }
        });
    }
    getAllHealthfacility(pageSize, offset, filter, state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (filter == "national") {
                    //general
                    logger_1.default.warn("national hf");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.hfRepository.getAllHealthfacilityNationalwithdate(pageSize, offset, from, to);
                        const [count] = yield this.hfRepository.getAllHealthfacilityNationalwithdateCount(from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.hfRepository.getAllHealthfacilityNational(pageSize, offset);
                        const [count] = yield this.hfRepository.getAllHealthfacilityNationalCount();
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "state") {
                    //state
                    logger_1.default.warn("state hf");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.hfRepository.getAllHealthfacilityStatewithdate(pageSize, offset, state, from, to);
                        const [count] = yield this.hfRepository.getAllHealthfacilityStatewithdateCount(state, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.hfRepository.getAllHealthfacilityState(pageSize, offset, state);
                        const [count] = yield this.hfRepository.getAllHealthfacilityStateCount(state);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                }
                if (filter == "lga") {
                    //lga
                    logger_1.default.warn("lga hf");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.hfRepository.getAllHealthfacilityLgawithdate(pageSize, offset, state, lga, from, to);
                        const [count] = yield this.hfRepository.getAllHealthfacilityLgawithdateCount(state, lga, from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.hfRepository.getAllHealthfacilityLga(pageSize, offset, state, lga);
                        const [count] = yield this.hfRepository.getAllHealthfacilityLgaCount(state, lga);
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
exports.HealthfacilityService = HealthfacilityService;
