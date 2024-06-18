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
exports.WardService = void 0;
class WardService {
    constructor(wardRepository) {
        this.wardRepo = wardRepository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.wardRepo.create(data);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getAllWards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.wardRepo.getAllWards();
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getAllWardsForState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.wardRepo.getAllWardsForState(state);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getAllWardsForLga(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.wardRepo.getAllWardsForLga(state, lga);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.WardService = WardService;
