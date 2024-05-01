"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthfacilityvalidation = void 0;
const joi_1 = __importDefault(require("joi"));
class healthfacilityvalidation {
}
exports.healthfacilityvalidation = healthfacilityvalidation;
healthfacilityvalidation.createAccount = (values) => {
    const schema = joi_1.default.object({
        ward: joi_1.default.string(),
        healthfacilityname: joi_1.default.string(),
        lga: joi_1.default.string(),
        state: joi_1.default.string(),
        healthfacilityID: joi_1.default.string(),
        officeaddress: joi_1.default.string(),
        phone: joi_1.default.string().trim().length(11),
        email: joi_1.default.string().trim().email(),
    });
    return schema.validate(values);
};
healthfacilityvalidation.createUserAccount = (values) => {
    const schema = joi_1.default.object({
        ward: joi_1.default.string(),
        staffname: joi_1.default.string(),
        staffid: joi_1.default.string(),
        gender: joi_1.default.string(),
        cadre: joi_1.default.string(),
        lga: joi_1.default.string(),
        state: joi_1.default.string(),
        // healthfacilityid: Joi.string(),
        userid: joi_1.default.string(),
        password: joi_1.default.string(),
        phone: joi_1.default.string().trim().length(13),
        email: joi_1.default.string().trim().email(),
    });
    return schema.validate(values);
};
healthfacilityvalidation.gethealthfacilityaccountsfiltered = (values) => {
    const schema = joi_1.default.object({
        lga: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
    });
    return schema.validate(values);
};
