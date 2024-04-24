"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AncvisitQueries = void 0;
class AncvisitQueries {
    static createancvisit() {
        return `INSERT INTO ancvisit (
                patient_id,
                healthpersonnel_id,
                anc_number,
                missed,
                attended,
              ) VALUES (?,?,?,?,?,?)`;
    }
}
exports.AncvisitQueries = AncvisitQueries;
