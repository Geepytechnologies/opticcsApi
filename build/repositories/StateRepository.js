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
exports.StateRepository = void 0;
const state_1 = require("../queries/admin/state");
class StateRepository {
    constructor(connection) {
        this.connection = connection;
    }
    getAllStatesNational(pageSize, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = state_1.StateQueries.getAllStateNational(pageSize, offset);
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllStatesNationalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = state_1.StateQueries.getAllStateNationalCount();
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllStatesNationalwithdate(pageSize, offset, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = state_1.StateQueries.getAllStateNationalwithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllStatesNationalwithdateCount(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = state_1.StateQueries.getAllstateNationalwithdateCount();
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.StateRepository = StateRepository;
