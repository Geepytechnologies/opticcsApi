"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateQueries = void 0;
class StateQueries {
    static getAllStateNational(pageSize, offset) {
        return `SELECT *
          FROM stateaccount ORDER BY
          id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllStateNationalCount() {
        return `SELECT count(*) as total 
          FROM stateaccount`;
    }
    static getAllStateNationalwithdate(pageSize, offset) {
        return `SELECT * 
          FROM stateaccount AND DATE(createdat) BETWEEN ? AND ? ORDER BY
          id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllstateNationalwithdateCount() {
        return `SELECT count(*) as total
          FROM stateaccount AND DATE(createdat) BETWEEN ? AND ?`;
    }
}
exports.StateQueries = StateQueries;
