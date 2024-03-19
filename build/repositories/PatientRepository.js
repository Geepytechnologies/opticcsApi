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
exports.patientRepository = void 0;
const patient_1 = require("../queries/user/patient");
class patientRepository {
    constructor(connection) {
        this.connection = connection;
    }
    checkifpatientwithphonenumberexists(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientByPhone();
            try {
                const result = yield this.connection.execute(q, [phone]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    createPersonalrecord(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.patientpersonalrecord();
            const values = [
                data.hospitalnumber,
                data.firstname,
                data.middlename,
                data.surname,
                data.phone,
                data.address,
                data.state,
                data.dateofbirth,
                data.lga,
                data.healthfacility,
                data.gravidity,
                data.parity,
                data.alive,
                data.lmpknown,
                data.lmp,
                data.edd,
                data.ega,
                data.laborstarted,
                data.firstbabymovement,
                data.doyoufeelthebabysmovement,
                data.doyouknowdateoffirstbabymovement,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.patientRepository = patientRepository;
