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
exports.WardRepository = void 0;
const ward_1 = require("../queries/ward");
class WardRepository {
    constructor(connection) {
        this.connection = connection;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = ward_1.wardQueries.create();
                const values = [data.state, data.lga, data.ward];
                const [result] = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllWards() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = ward_1.wardQueries.getAllWards();
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllWardsForState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = ward_1.wardQueries.getAllWardsForState();
            try {
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllWardsForLga(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = ward_1.wardQueries.getAllWardsForLga();
            try {
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.WardRepository = WardRepository;
