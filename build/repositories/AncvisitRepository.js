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
exports.AncvisitRepository = void 0;
const ancvisit_1 = require("../queries/user/ancvisit");
class AncvisitRepository {
    constructor(connection) {
        this.connection = connection;
    }
    getUserLastANC(patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = ancvisit_1.AncvisitQueries.getUserLastANC();
                const [result] = yield this.connection.execute(q, [patient_id]);
                return result[0];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createancvisit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = ancvisit_1.AncvisitQueries.createancvisit();
            const values = [
                data.patient_id,
                data.healthpersonnel_id,
                data.anc_number,
                data.lastANC,
                data.missed,
                data.attended,
            ];
            try {
                const [result] = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createancvisit");
            }
        });
    }
    updateancvisit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = ancvisit_1.AncvisitQueries.updateancvisit();
            const values = [
                data.healthpersonnel_id,
                data.anc_number,
                data.lastANC,
                data.missed,
                data.attended,
                data.patient_id,
            ];
            try {
                const [result] = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "updateancvisit");
            }
        });
    }
}
exports.AncvisitRepository = AncvisitRepository;
