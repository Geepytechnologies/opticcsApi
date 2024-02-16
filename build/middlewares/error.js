"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "CustomError";
        this.status = status;
    }
}
const createError = (status, message) => {
    return new CustomError(status, message);
};
exports.createError = createError;
