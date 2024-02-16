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
exports.HealthFacilityRepository = void 0;
const db_1 = __importDefault(require("../config/db"));
const logger_1 = __importDefault(require("../logger"));
class HealthFacilityRepository {
    static checkIfAccountExists(healthfacilityID) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const q = `SELECT * FROM healthfacilityaccount WHERE healthfacilityID =?`;
            try {
                let checked;
                const result = yield connection.execute(q, [healthfacilityID]);
                if (Array.isArray(result[0])) {
                    if (result[0].length) {
                        checked = true;
                    }
                    else {
                        checked = false;
                    }
                }
                return checked;
            }
            catch (error) {
                connection.release();
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
    static checkIfUserAccountExists(userID, hashedpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const q = `SELECT * FROM healthfacilityadmin WHERE userid = ? AND password = ?`;
            try {
                let checked;
                const result = yield connection.execute(q, [userID, hashedpassword]);
                if (Array.isArray(result[0])) {
                    if (result[0].length) {
                        checked = true;
                    }
                    else {
                        checked = false;
                    }
                }
                return checked;
            }
            catch (error) {
                connection.release();
                throw new Error(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
    static createHealthFacilityAccount(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const q = `INSERT INTO healthfacilityaccount (ward, healthfacilityname, lga, state, healthfacilityID, officeaddress, phone, email)
    VALUES (?, ?, ?, ?, ?, ?,?,?)`;
            try {
                const result = yield connection.execute(q, values);
                return result;
            }
            catch (error) {
                connection.release();
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
    static createHealthFacilityUserAccount(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const q = `INSERT INTO healthfacilityadmin (ward, staffname,staffid, gender,lga, state, cadre, phone, email,userid ,password,healthfacilityid)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
            try {
                const result = yield connection.execute(q, values);
                return result;
            }
            catch (error) {
                connection.release();
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
    static getHealthFacilityUserAccountUsingStateAndLga(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db_1.default.getConnection();
            const q = `SELECT * FROM healthfacilityaccount WHERE state = ? AND lga = ?`;
            try {
                const result = yield connection.execute(q, [state, lga]);
                return result;
            }
            catch (error) {
                connection.release();
                logger_1.default.error(error);
                throw new Error(error);
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
}
exports.HealthFacilityRepository = HealthFacilityRepository;
