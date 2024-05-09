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
    static getAllScheduleNational(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleNationalCount() {
        return `SELECT count(*) as total 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id`;
    }
    static getAllScheduleNationalwithdate(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id AND DATE(createdat) BETWEEN ? AND ?  ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleNationalwithdateCount() {
        return `SELECT count(*) as total
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static getAllScheduleState(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ?  ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleStateCount() {
        return `SELECT count(*) as total 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ?`;
    }
    static getAllScheduleStatewithdate(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND DATE(createdat) BETWEEN ? AND ?  ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleStatewithdateCount() {
        return `SELECT count(*) as total
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static getAllScheduleLga(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND personalinformation.lga = ?  ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleLgaCount() {
        return `SELECT count(*) as total 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND personalinformation.lga = ?`;
    }
    static getAllScheduleLgawithdate(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND personalinformation.lga = ? AND DATE(createdat) BETWEEN ? AND ?  ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleLgawithdateCount() {
        return `SELECT count(*) as total 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND personalinformation.lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static getAllScheduleHealthfacility(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND  personalinformation.healthfacility = ?  ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleHealthfacilityCount() {
        return `SELECT count(*) as total 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND  personalinformation.healthfacility = ?`;
    }
    static getAllScheduleHealthfacilitywithdate(pageSize, offset) {
        return `SELECT schedule.*, personalinformation.firstname,
    personalinformation.middlename,
    personalinformation.surname,
    personalinformation.state,personalinformation.lga,
    personalinformation.healthfacility 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND  personalinformation.healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?  ORDER BY
    schedule.id DESC LIMIT ${pageSize} OFFSET ${offset}`;
    }
    static getAllScheduleHealthfacilitywithdateCount() {
        return `SELECT count(*) as total 
    FROM schedule LEFT JOIN patients p ON schedule.patient_id = p.id LEFT JOIN personalinformation ON p.personalinformation_id = personalinformation.id WHERE personalinformation.state = ? AND  personalinformation.healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
}
exports.ScheduleQueries = ScheduleQueries;
