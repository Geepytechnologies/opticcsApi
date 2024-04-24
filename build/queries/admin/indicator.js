"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorQuery = void 0;
class IndicatorQuery {
    //:::::Intermediate result 1:::::://
    //1A Proportion of pregnant women with at least 4 ANC visits at intervention facility
    static IntermediateResult1A() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE anc = 4;    
    `;
    }
    static IntermediateResult1Awithdate() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
    }
    static StateIntermediateResult1A() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND anc = 4;    
    `;
    }
    static StateIntermediateResult1Awithdate() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
    }
    static LgaIntermediateResult1A() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND lga = ? AND anc = 4;    
    `;
    }
    static LgaIntermediateResult1Awithdate() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND lga = ? AND anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
    }
    static HealthfacilityIntermediateResult1A() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND healthfacility = ? AND anc = 4;    
    `;
    }
    static HealthfacilityIntermediateResult1Awithdate() {
        return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND healthfacility = ? AND anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
    }
    // 1B Proportion of pregnant women who attended at least one ANC Visit and delivered at health facility
    static IntermediateResult1B() {
        return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND attendAncVisit = "yes" `;
    }
    static IntermediateResult1Bwithdate() {
        return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static StateIntermediateResult1B() {
        return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
    }
    static StateIntermediateResult1Bwithdate() {
        return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static LgaIntermediateResult1B() {
        return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.lga = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
    }
    static LgaIntermediateResult1Bwithdate() {
        return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.lga = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static HealthfacilityIntermediateResult1B() {
        return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.healthfacility = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
    }
    static HealthfacilityIntermediateResult1Bwithdate() {
        return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.healthfacility = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
    }
    // 1C Proportion of pregnant women at ANC 1st visit less than 20 weeks
    static IntermediateResult1C() {
        return `SELECT ega FROM personalinformation`;
    }
    static IntermediateResult1Cwithdate() {
        return `SELECT ega FROM personalinformation AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static StateIntermediateResult1C() {
        return `SELECT ega FROM personalinformation WHERE state = ?`;
    }
    static StateIntermediateResult1Cwithdate() {
        return `SELECT ega FROM personalinformation WHERE state = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static LgaIntermediateResult1C() {
        return `SELECT ega FROM personalinformation WHERE state = ? AND lga = ?`;
    }
    static LgaIntermediateResult1Cwithdate() {
        return `SELECT ega FROM personalinformation WHERE state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static HealthfacilityIntermediateResult1C() {
        return `SELECT ega FROM personalinformation WHERE state = ? AND healthfacility = ?`;
    }
    static HealthfacilityIntermediateResult1Cwithdate() {
        return `SELECT ega FROM personalinformation WHERE state = ? AND healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
    // 1D Proportion of pregnant women at ANC 1st Vist less than 20 weeks that achieved 8 ANC visits
    static IntermediateResult1D() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8`;
    }
    static IntermediateResult1Dwithstate() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8 AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static StateIntermediateResult1D() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8 AND rv.state = ?`;
    }
    static StateIntermediateResult1Dwithdate() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8 AND rv.state = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static LgaIntermediateResult1D() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8 AND rv.state = ? AND rv.lga = ? `;
    }
    static LgaIntermediateResult1Dwithdate() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8 AND rv.state = ? AND rv.lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
    static HealthfacilityIntermediateResult1D() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8 AND rv.state = ? AND rv.healthfacility = ?`;
    }
    static HealthfacilityIntermediateResult1Dwithdate() {
        return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.anc = 8 AND rv.state = ? AND rv.healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
    }
}
exports.IndicatorQuery = IndicatorQuery;
