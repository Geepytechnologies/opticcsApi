"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryreportRepository = void 0;
const deliveryReport_1 = require("../queries/user/deliveryReport");
class DeliveryreportRepository {
    constructor(connection) {
        this.connection = connection;
    }
    createdeliveryreport(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = deliveryReport_1.DeliveryreportQueries.createdeliveryreport();
            const values = [
                data.healthpersonnel_id,
                data.firstname,
                data.lastname,
                data.deliverydata,
                data.numberofchildren,
                data.deliverydate,
                data.deliverytime,
                data.deliverAtHealthFacility,
                data.givenPostPartum,
                data.attendAncVisit,
            ];
            try {
                const [result] = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getADeliveryReportById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = deliveryReport_1.DeliveryreportQueries.getADeliveryreportById();
            try {
                const [result] = yield this.connection.execute(q, [id]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllDeliveryreports() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = deliveryReport_1.DeliveryreportQueries.getAllDeliveryreports();
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAllDeliveryreportsByAWorker(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = deliveryReport_1.DeliveryreportQueries.getAllDeliveryreportsByAWorker();
            try {
                const [result] = yield this.connection.execute(q, [id]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAPatientsDeliveryreport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = deliveryReport_1.DeliveryreportQueries.getAPatientsDeliveryreport();
            try {
                const [result] = yield this.connection.execute(q, [id]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.DeliveryreportRepository = DeliveryreportRepository;
