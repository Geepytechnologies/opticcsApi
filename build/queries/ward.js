"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wardQueries = void 0;
class wardQueries {
    static create() {
        return `INSERT INTO wards (state,lga,ward) VALUES (?,?,?)`;
    }
    static getAllWards() {
        return `SELECT * FROM wards`;
    }
    static getAllWardsForState() {
        return `SELECT * FROM wards WHERE state = ?`;
    }
    static getAllWardsForLga() {
        return `SELECT * FROM wards WHERE state = ? AND lga = ?`;
    }
}
exports.wardQueries = wardQueries;
