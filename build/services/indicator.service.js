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
exports.IndicatorService = void 0;
const logger_1 = __importDefault(require("../logger"));
const patients_1 = require("../utils/patients");
class IndicatorService {
    constructor(IndicatorRepo) {
        this.indicatorRepository = IndicatorRepo;
    }
    intermediateResult1(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Awithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1A();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Awithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1A();
                    }
                }
                if (state !== "all" &&
                    state !== "" &&
                    (lga == "all" || lga == "") &&
                    healthfacility == "") {
                    //state
                    logger_1.default.warn("state");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.StateIntermediateResult1Awithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult1A(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult1Awithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult1A(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1Awithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1A(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    intermediateResult1B() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = "";
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // 1C Proportion of pregnant women at ANC 1st visit less than 20 weeks
    intermediateResult1C() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.indicatorRepository.IntermediateResult1C();
                console.log(result);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    intermediateResult2() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = "";
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    intermediateResult3() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = "";
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    activity1() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = "";
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    activity2() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = "";
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.IndicatorService = IndicatorService;
