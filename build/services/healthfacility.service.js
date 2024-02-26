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
exports.HealthfacilityService = void 0;
const global_1 = require("../utils/global");
class HealthfacilityService {
    constructor(HfRepository) {
        this.hfRepository = HfRepository;
    }
    generateUniqueCredentials(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = global_1.Global.generateRandomString(8);
            const password = global_1.Global.generateRandomString(12);
            try {
                // Check if the generated username already exists in the database
                const [results] = yield this.hfRepository.getHealthfacilityUserAccountByUserID(username);
                if (Array.isArray(results)) {
                    if (results.length > 0) {
                        this.generateUniqueCredentials(callback);
                    }
                    else {
                        callback(null, { username, password });
                    }
                }
            }
            catch (err) {
                callback(err, null);
            }
        });
    }
}
exports.HealthfacilityService = HealthfacilityService;
