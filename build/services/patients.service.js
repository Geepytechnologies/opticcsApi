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
exports.PatientService = void 0;
const logger_1 = __importDefault(require("../logger"));
const patients_1 = require("../utils/patients");
const AncvisitRepository_1 = require("../repositories/AncvisitRepository");
const error_1 = require("../utils/error");
class PatientService {
    constructor(patientRepository, connection) {
        this.patientRepo = patientRepository;
        this.ancvisitRepo = new AncvisitRepository_1.AncvisitRepository(connection);
    }
    checkIfPatientWithPhoneNumberExists(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.patientRepo.checkifpatientwithphonenumberexists(phone);
                if (Array.isArray(result[0])) {
                    if (result[0].length) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            catch (error) {
                logger_1.default.error({
                    method: "checkIfPatientWithPhoneNumberExists",
                    error: error,
                });
            }
        });
    }
    personalRecord(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientexists = yield this.checkIfPatientWithPhoneNumberExists(data.phone);
            if (!patientexists) {
                const result = yield this.patientRepo.createPersonalrecord(data);
                return result;
            }
            else {
                throw new Error(`Patient with phone number ${data.phone} already exists`);
            }
        });
    }
    getnewlycreatedpatientrecord(patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.patientRepo.getnewlycreatedpatientrecord(patient_id);
            return result;
        });
    }
    createPatientFirstvisit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(data);
            try {
                const createdrecord = yield this.personalRecord(data);
                const personalInformation_id = createdrecord[0].insertId;
                const patientcreate = yield this.patientRepo.createpatient(data, personalInformation_id);
                const patientID = patientcreate[0].insertId;
                const firstvisitcreation = yield this.patientRepo.createfirstvisit(data, patientID);
                const firstvisitID = firstvisitcreation[0].insertId;
                yield this.patientRepo.createmedicalhistory(data, firstvisitID);
                yield this.patientRepo.createfamilyhistory(data, firstvisitID);
                yield this.patientRepo.createdailyhabit(data, firstvisitID);
                yield this.patientRepo.createobstetric(data, firstvisitID);
                yield this.patientRepo.createmedicalhistory(data, firstvisitID);
                yield this.patientRepo.createdrughistory(data, firstvisitID);
                yield this.patientRepo.createphysicalexamination(data, firstvisitID);
                //creating a new ancvisit record for the first visit
                const ancdata = {
                    patient_id: patientID,
                    healthpersonnel_id: data.healthpersonnel_id,
                    anc_number: "1",
                    lastANC: "1",
                    missed: "0",
                    attended: "1",
                };
                yield this.ancvisitRepo.createancvisit(ancdata);
                return patientID;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createPatientReturnvisit(data, healthpersonnel_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if patient has completed anc
            const patientHasCompletedANC = yield this.patientRepo.checkIfPatientHasCompletedANC(data.patient_id);
            if (!patientHasCompletedANC) {
                //get the patients last ancvisit number
                const ancvisit = yield this.ancvisitRepo.getUserLastANC(data.patient_id);
                //creating a new ancvisit record for the return visit
                const currentanc = ancvisit.lastANC + 1;
                const result = yield this.patientRepo.createReturnVisitWithANC(data, currentanc);
                const ancdata = {
                    patient_id: ancvisit.patient_id,
                    healthpersonnel_id: healthpersonnel_id,
                    anc_number: currentanc,
                    lastANC: currentanc,
                    missed: ancvisit.missed,
                    attended: ancvisit.attended + 1,
                };
                yield this.ancvisitRepo.updateancvisit(ancdata);
                return result;
            }
            else {
                throw new error_1.ANCCompletionError("Patient has completed ANC");
            }
        });
    }
    deleteAPatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.patientRepo.deleteAPatient(id);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getPatientRecord(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.patientRepo.deleteAPatient(id);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getAllPatientsAndHealthworker(query, pageSize, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = query.state || "";
            const lga = query.lga || "";
            const healthfacility = query.healthfacility || "";
            const from = query.from || "";
            const to = query.to || "";
            console.log(state);
            console.log(lga);
            console.log(healthfacility);
            try {
                if (patients_1.Patientconditions.allStates(state, lga, healthfacility)) {
                    logger_1.default.warn("state");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerFilteredByStatewithdate(pageSize, offset, state, from, to);
                        const [count] = yield this.patientRepo.getPatientsWithHealthworkerFilteredByStateCountwithdate(state, from, to);
                        const data = { result: result, count: count.total_count };
                        return data;
                    }
                    else {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerFilteredByState(pageSize, offset, state);
                        const [count] = yield this.patientRepo.getPatientsWithHealthworkerFilteredByStateCount(state);
                        const data = { result: result, count: count.total_count };
                        return data;
                    }
                }
                //::: lga ::://
                if (patients_1.Patientconditions.allLga(state, lga)) {
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerFilteredByLgawithdate(pageSize, offset, state, lga, from, to);
                        const [count] = yield this.patientRepo.getPatientsWithHealthworkerFilteredByLgaCountwithdate(state, lga, from, to);
                        const data = { result: result, count: count.total_count };
                        return data;
                    }
                    else {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerFilteredByLga(pageSize, offset, state, lga);
                        const [count] = yield this.patientRepo.getPatientsWithHealthworkerFilteredByLgaCount(state, lga);
                        const data = { result: result, count: count.total_count };
                        return data;
                    }
                }
                if (patients_1.Patientconditions.allHealthFacility(state, lga, healthfacility)) {
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacilitywithdate(pageSize, offset, state, lga, healthfacility, from, to);
                        const [count] = yield this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacilityCountwithdate(state, lga, healthfacility, from, to);
                        const data = { result: result, count: count.total_count };
                        return data;
                    }
                    else {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacility(pageSize, offset, state, lga, healthfacility);
                        const [count] = yield this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacilityCount(state, lga, healthfacility);
                        const data = { result: result, count: count.total_count };
                        return data;
                    }
                }
                if (patients_1.Patientconditions.national1(state, lga, healthfacility)) {
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerwithdate(pageSize, offset, from, to);
                        const result2 = yield this.patientRepo.getPatientCountwithdate(from, to);
                        const data = { result: result, count: result2 };
                        return data;
                    }
                    else {
                        const result = yield this.patientRepo.getPatientsWithHealthworker(pageSize, offset);
                        const result2 = yield this.patientRepo.getPatientCount();
                        const data = { result: result, count: result2 };
                        return data;
                    }
                }
                if (patients_1.Patientconditions.national2(state, lga, healthfacility)) {
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        const result = yield this.patientRepo.getPatientsWithHealthworkerwithdate(pageSize, offset, from, to);
                        const result2 = yield this.patientRepo.getPatientCountwithdate(from, to);
                        const data = { result: result, count: result2 };
                        return data;
                    }
                    else {
                        const result = yield this.patientRepo.getPatientsWithHealthworker(pageSize, offset);
                        const result2 = yield this.patientRepo.getPatientCount();
                        const data = { result: result, count: result2 };
                        return data;
                    }
                }
                const result = yield this.patientRepo.getPatientsWithHealthworker(pageSize, offset);
                const result2 = yield this.patientRepo.getPatientCount();
                const data = { result: result, count: result2 };
                return data;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getPatientCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.patientRepo.getPatientCount();
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visits(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (state == "" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.patientRepo.numberofwomenwith4visitswithdate(from, to);
                    }
                    else {
                        result = yield this.patientRepo.numberofwomenwith4visits();
                    }
                }
                if (state == "all" && lga == "" && healthfacility == "") {
                    //general
                    logger_1.default.warn("general");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result = yield this.patientRepo.numberofwomenwith4visitswithdate(from, to);
                    }
                    else {
                        result = yield this.patientRepo.numberofwomenwith4visits();
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
                            yield this.patientRepo.numberofwomenwith4visitsforstatewithdate(state, from, to);
                    }
                    else {
                        result = yield this.patientRepo.numberofwomenwith4visitsforstate(state);
                    }
                }
                if (state !== "" &&
                    lga !== "" &&
                    (healthfacility == "all" || healthfacility == "")) {
                    //lga
                    logger_1.default.warn("lga");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.patientRepo.numberofwomenwith4visitsforlgawithdate(state, lga, from, to);
                    }
                    else {
                        result = yield this.patientRepo.numberofwomenwith4visitsforlga(state, lga);
                    }
                }
                if (state !== "" && lga !== "" && healthfacility !== "") {
                    //healthfacility
                    logger_1.default.warn("healthfacility");
                    if (patients_1.Patientconditions.datesAreNotEmpty(from, to)) {
                        result =
                            yield this.patientRepo.numberofwomenwith4visitsforhealthfacilitywithdate(state, healthfacility, from, to);
                    }
                    else {
                        result =
                            yield this.patientRepo.numberofwomenwith4visitsforhealthfacility(state, healthfacility);
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
exports.PatientService = PatientService;
