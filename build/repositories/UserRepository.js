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
exports.UserRepository = void 0;
const user_1 = require("../queries/user/user");
class UserRepository {
    constructor(connection) {
        this.connection = connection;
    }
    getUserByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, user_1.getAUserByPhone)();
            try {
                const [result] = yield this.connection.execute(q, [phone]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersNational(pageSize, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersNational(pageSize, offset);
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllUsersNationalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersNationalCount();
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    getAllUsersNationalwithdate(pageSize, offset, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersNationalwithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersNationalwithdateCount(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersNationalwithdateCount();
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersState(pageSize, offset, state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersState(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersStateCount(state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersStateCount();
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersStatewithdate(pageSize, offset, state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersStatewithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersStatewithdateCount(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersStatewithdateCount();
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersLga(pageSize, offset, state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersLga(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersLgaCount(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersLgaCount();
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersLgawithdate(pageSize, offset, state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersLgawithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersLgawithdateCount(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersLgawithdateCount();
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersHealthfacility(pageSize, offset, state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersHealthfacility(pageSize, offset);
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersHealthfacilityCount(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersHealthfacilityCount();
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersHealthfacilitywithdate(pageSize, offset, state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersHealthfacilitywithdate(pageSize, offset);
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllUsersHealthfacilitywithdateCount(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = user_1.UserQueries.getAllUsersHealthfacilitywithdateCount();
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.UserRepository = UserRepository;
