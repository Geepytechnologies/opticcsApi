export class IndicatorQuery {
  static IntermediateResult1A() {
    return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND attendAncVisit = "yes"`;
  }
  static StateIntermediateResult1A() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  static LgaIntermediateResult1A() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.lga = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  static HealthfacilityIntermediateResult1A() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.healthfacility = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  // 1B
  static IntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND attendAncVisit = "yes"`;
  }
  static StateIntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  static LgaIntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.lga = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  static HealthfacilityIntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.healthfacility = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
}
