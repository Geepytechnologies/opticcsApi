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
exports.StateService = void 0;
const logger_1 = __importDefault(require("../logger"));
const patients_1 = require("../utils/patients");
class StateService {
    constructor(StateRepository) {
        this.stateRepository = StateRepository;
    }
    getAllStates(pageSize, offset, filter, state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (filter == "national") {
                    //general
                    logger_1.default.warn("national states");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.stateRepository.getAllStatesNationalwithdate(pageSize, offset, from, to);
                        const [count] = yield this.stateRepository.getAllStatesNationalwithdateCount(from, to);
                        const data = { result: result, count: count.total };
                        return data;
                    }
                    else {
                        const result = yield this.stateRepository.getAllStatesNational(pageSize, offset);
                        const [count] = yield this.stateRepository.getAllStatesNationalCount();
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
exports.StateService = StateService;
