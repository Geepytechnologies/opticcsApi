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
exports.TestresultRepository = void 0;
const testResults_1 = require("../queries/user/testResults");
class TestresultRepository {
    constructor(connection) {
        this.connection = connection;
    }
    createTest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = testResults_1.TestResultQueries.createTest();
                const values = [
                    data.healthpersonnel_id,
                    data.requestedtest_id,
                    data.hb,
                    data.wcc,
                    data.rcc,
                    data.pcv,
                    data.mcv,
                    data.platelet,
                    data.glucose,
                    data.hiv,
                    data.hepatitis,
                    data.patient_id,
                    data.rdt,
                    data.bodytemp,
                    data.heartrate,
                    data.respiratoryrate,
                    data.bodypressure,
                    data.malariarapid,
                    data.leukocytes,
                    data.nitrites,
                    data.urobilinogen,
                    data.protein,
                    data.pH,
                    data.blood,
                    data.specificgravity,
                    data.ketones,
                    data.bilirubin,
                    data.glucoseUrinary,
                    data.neutrophils,
                    data.lymphocytes,
                    data.monocytes,
                    data.eosinophils,
                    data.basophils,
                    data.Haematocrit,
                    data.mch,
                    data.reticulocytecount,
                    data.hbsag,
                    data.hcv,
                ];
                const [result] = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getTestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = testResults_1.TestResultQueries.getATestById();
            try {
                const [result] = yield this.connection.execute(q, [id]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.TestresultRepository = TestresultRepository;
