"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumeratorQueries = void 0;
class EnumeratorQueries {
    static createEnumerator() {
        return `INSERT INTO wards (state,lga,ward) VALUES (?,?,?)`;
    }
}
exports.EnumeratorQueries = EnumeratorQueries;
