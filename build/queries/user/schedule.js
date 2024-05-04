"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleQueries = void 0;
class ScheduleQueries {
    static createSchedule() {
        return `INSERT INTO schedule (healthpersonnel_id, patient_id, dateFrom, dateTo, firstname, middlename, lastname, phone) VALUES (?, ?, ?, ?,?,?,?,?)`;
    }
    static getScheduleById() {
        return `SELECT * FROM schedule WHERE id = ?`;
    }
    static getAHealthWorkersCompletedSchedule() {
        return `SELECT * FROM schedule WHERE completed = 1 AND healthpersonnel_id = ?`;
    }
    static getAHealthWorkersMissedSchedule() {
        return `SELECT * FROM schedule WHERE missed = 1 AND healthpersonnel_id = ?`;
    }
    static getAPatientsSchedule() {
        return `SELECT * FROM schedule WHERE patient_id = ?`;
    }
}
exports.ScheduleQueries = ScheduleQueries;
