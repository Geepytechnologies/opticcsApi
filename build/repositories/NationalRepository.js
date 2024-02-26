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
exports.NationalRepository = void 0;
const logger_1 = __importDefault(require("../logger"));
class NationalRepository {
    constructor(connection) {
        this.connection = connection;
    }
    getNationalAdminByUserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM nationaladmin WHERE userid = ?`;
            try {
                console.log("im using %d for gnauid", this.connection.threadId);
                const result = yield this.connection.execute(q, [userID]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
            }
            finally {
                console.log("i released %d in gnauid", this.connection.threadId);
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
    createRefresh(refreshToken, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `UPDATE nationaladmin SET refreshtoken = ? WHERE userid = ?`;
            try {
                console.log("im using %d for refresh", this.connection.threadId);
                yield this.connection.execute(q, [refreshToken, userID]);
            }
            catch (error) {
                logger_1.default.error(error);
            }
            finally {
                console.log("i released %d in refresh", this.connection.threadId);
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
}
exports.NationalRepository = NationalRepository;
