"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryreportQueries = void 0;
class DeliveryreportQueries {
    static createdeliveryreport() {
        return `INSERT INTO deliveryreport (
            healthpersonnel_id,
            firstname,
            lastname,
            deliverydata,
            numberofchildren,
            deliverydate,
            deliverytime,deliverAtHealthFacility,
            givenPostPartum,
            attendAncVisit
            ) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    }
    static getAllDeliveryreports() {
        return `SELECT * FROM deliveryreport`;
    }
    static getAllDeliveryreportsByAWorker() {
        return `SELECT * FROM deliveryreport WHERE healthpersonnel_id = ?`;
    }
    static getAPatientsDeliveryreport() {
        return `SELECT * FROM deliveryreport WHERE patient_id = ?`;
    }
    static getADeliveryreportById() {
        return `SELECT * FROM deliveryreport WHERE id = ?`;
    }
}
exports.DeliveryreportQueries = DeliveryreportQueries;
