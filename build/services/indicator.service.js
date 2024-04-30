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
    intermediateResult1A(state, lga, healthfacility, from, to) {
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
    //------- 1B Proportion of pregnant women who attended at least one ANC Visit and delivered at health facility -----
    intermediateResult1B(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Bwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1B();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Bwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1B();
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
                            yield this.indicatorRepository.StateIntermediateResult1Bwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult1B(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult1Bwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult1B(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1Bwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1B(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 1C Proportion of pregnant women at ANC 1st visit less than 20 weeks -----
    intermediateResult1C(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Cwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1C();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Cwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1C();
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
                            yield this.indicatorRepository.StateIntermediateResult1Cwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult1C(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult1Cwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult1C(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1Cwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1C(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 1D Proportion of pregnant women at ANC 1st Vist less than 20 weeks that achieved 8 ANC visits -----
    intermediateResult1D(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Dwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1D();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Dwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1D();
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
                            yield this.indicatorRepository.StateIntermediateResult1Dwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult1D(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult1Dwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult1D(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1Dwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1D(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 1E Proportion of pregnant women who commenced ANC but missed more than one session -----
    intermediateResult1E(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Ewithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1E();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Ewithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1E();
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
                            yield this.indicatorRepository.StateIntermediateResult1Ewithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult1E(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult1Ewithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult1E(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1Ewithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1E(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2A Proportion of pregnant women who were contacted and resumed ANC visits -----
    intermediateResult1F(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Fwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1F();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult1Fwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult1F();
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
                            yield this.indicatorRepository.StateIntermediateResult1Fwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult1F(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult1Fwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult1F(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1Fwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult1F(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2A  -----
    intermediateResult2A(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Awithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2A();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Awithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2A();
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
                            yield this.indicatorRepository.StateIntermediateResult2Awithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult2A(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult2Awithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult2A(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2Awithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2A(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2B  -----
    intermediateResult2B(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Bwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2B();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Bwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2B();
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
                            yield this.indicatorRepository.StateIntermediateResult2Bwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult2B(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult2Bwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult2B(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2Bwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2B(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2C  -----
    intermediateResult2C(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Cwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2C();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Cwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2C();
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
                            yield this.indicatorRepository.StateIntermediateResult2Cwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult2C(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult2Cwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult2C(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2Cwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2C(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2D  -----
    intermediateResult2D(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Dwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2D();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Dwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2D();
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
                            yield this.indicatorRepository.StateIntermediateResult2Dwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult2D(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult2Dwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult2D(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2Dwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2D(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2E  -----
    intermediateResult2E(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Ewithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2E();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Ewithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2E();
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
                            yield this.indicatorRepository.StateIntermediateResult2Ewithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult2E(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult2Ewithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult2E(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2Ewithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2E(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2F  -----
    intermediateResult2F(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Fwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2F();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Fwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2F();
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
                            yield this.indicatorRepository.StateIntermediateResult2Fwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult2F(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult2Fwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult2F(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2Fwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2F(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //------- 2G  -----
    intermediateResult2G(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Gwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2G();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.indicatorRepository.IntermediateResult2Gwithdate(from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.IntermediateResult2G();
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
                            yield this.indicatorRepository.StateIntermediateResult2Gwithdate(state, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.StateIntermediateResult2G(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.LgaIntermediateResult2Gwithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.indicatorRepository.LgaIntermediateResult2G(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2Gwithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.indicatorRepository.HealthfacilityIntermediateResult2G(state, healthfacility);
                    }
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.IndicatorService = IndicatorService;
