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
exports.IndicatorRepository = void 0;
const indicator_1 = require("../queries/admin/indicator");
// NB: Visit Indicator.txt for definition descriptions
class IndicatorRepository {
    constructor(connection) {
        this.connection = connection;
    }
    // IntermediateResut1
    IntermediateResult1A() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1A();
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.IndicatorRepository = IndicatorRepository;
