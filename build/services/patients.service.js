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
                    return true;
                }
                else {
                    return false;
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
    createPatientFirstvisit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.PatientService = PatientService;
