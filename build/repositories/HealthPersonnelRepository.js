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
exports.HealthPersonnelRepository = void 0;
const logger_1 = __importDefault(require("../logger"));
class HealthPersonnelRepository {
    constructor(connection) {
        this.connection = connection;
    }
    updateHealthpersonnelverification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `UPDATE healthpersonnel SET verified = 1 WHERE id = ?`;
            try {
                const result = yield this.connection.execute(q, [id]);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (this.connection) {
                    this.connection.release();
                }
            }
        });
    }
}
exports.HealthPersonnelRepository = HealthPersonnelRepository;
