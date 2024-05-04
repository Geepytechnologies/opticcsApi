"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wardvalidation = void 0;
const joi_1 = __importDefault(require("joi"));
class wardvalidation {
    static create(values) {
        const schema = joi_1.default.object({
            state: joi_1.default.string().required(),
            lga: joi_1.default.string().required(),
            ward: joi_1.default.string().required(),
        });
        return schema.validate(values);
    }
}
exports.wardvalidation = wardvalidation;
