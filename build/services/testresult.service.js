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
exports.TestresultService = void 0;
class TestresultService {
    constructor(testresultRepository) {
        this.testresultRepo = testresultRepository;
    }
    createTest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.testresultRepo.createTest(data);
                const testresultid = result.insertId;
                const result2 = yield this.testresultRepo.getTestById(testresultid);
                return result2;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.TestresultService = TestresultService;
