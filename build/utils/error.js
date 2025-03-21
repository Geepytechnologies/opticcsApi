"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANCCompletionError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.CustomError = CustomError;
class ANCCompletionError extends CustomError {
    constructor(message) {
        super(message);
    }
}
exports.ANCCompletionError = ANCCompletionError;
