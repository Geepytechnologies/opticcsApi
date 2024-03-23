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
class PatientService {
    constructor(patientRepository) {
        this.patientRepo = patientRepository;
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
    createpatient(data, personalinformation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createpatient(data, personalinformation_id);
            return result;
        });
    }
    createfirstvisitdata(data, patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createfirstvisit(data, patient_id);
            return result;
        });
    }
    createdailyhabit(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createdailyhabit(data, firstvisit_id);
            return result;
        });
    }
    createobstetric(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createobstetric(data, firstvisit_id);
            return result;
        });
    }
    createmedicationHistory(data, firstVisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createmedicalhistory(data, firstVisit_id);
            return result;
        });
    }
    createpastmedicalHistory(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createpastmedicalhistory(data, firstvisit_id);
            return result;
        });
    }
    createfamilyHistory(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createfamilyhistory(data, firstvisit_id);
            return result;
        });
    }
    createdrugHistory(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createdrughistory(data, firstvisit_id);
            return result;
        });
    }
    createphysicalexamination(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.createphysicalexamination(data, firstvisit_id);
            return result;
        });
    }
    getnewlycreatedpatientrecord(patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.patientRepo.getnewlycreatedpatientrecord(patient_id);
            return result;
        });
    }
    createPatientFirstvisit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdrecord = yield this.personalRecord(data);
                const personalInformation_id = createdrecord[0].insertId;
                const patientcreate = yield this.createpatient(data, personalInformation_id);
                const patientID = patientcreate[0].insertId;
                const firstvisitcreation = yield this.createfirstvisitdata(data, patientID);
                const firstvisitID = firstvisitcreation[0].insertId;
                yield this.createpastmedicalHistory(data, firstvisitID);
                yield this.createfamilyHistory(data, firstvisitID);
                yield this.createdailyhabit(data, firstvisitID);
                yield this.createobstetric(data, firstvisitID);
                yield this.createmedicationHistory(data, firstvisitID);
                yield this.createdrugHistory(data, firstvisitID);
                yield this.createphysicalexamination(data, firstvisitID);
                return patientID;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createPatientReturnvisit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientexists = yield this.patientRepo.checkIfPatientRecordExistsInReturnvisit(data.patient_id);
            const anc = patientexists.lastanc;
            if (patientexists.value) {
                const result = yield this.patientRepo.createReturnVisitWithANC(data, anc);
                return result;
            }
            else {
                const result = yield this.patientRepo.createReturnVisit(data);
                return result;
            }
        });
    }
}
exports.PatientService = PatientService;
