export class HealthfacilityQueries {
  static getAllHealthfacilityNational(pageSize: number, offset: number) {
    return `SELECT *
        FROM healthfacilityaccount ORDER BY
        id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllHealthfacilityNationalCount() {
    return `SELECT count(*) as total 
        FROM healthfacilityaccount`;
  }
  static getAllHealthfacilityNationalwithdate(
    pageSize: number,
    offset: number
  ) {
    return `SELECT * 
        FROM healthfacilityaccount AND DATE(createdat) BETWEEN ? AND ? ORDER BY
        id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllHealthfacilityNationalwithdateCount() {
    return `SELECT count(*) as total
        FROM healthfacilityaccount AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static getAllHealthfacilityState(pageSize: number, offset: number) {
    return `SELECT * 
        FROM healthfacilityaccount WHERE state = ? ORDER BY
        id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllHealthfacilityStateCount() {
    return `SELECT count(*) as total 
        FROM healthfacilityaccount WHERE state = ?`;
  }
  static getAllHealthfacilityStatewithdate(pageSize: number, offset: number) {
    return `SELECT * 
        FROM healthfacilityaccount WHERE state = ? AND DATE(createdat) BETWEEN ? AND ?  ORDER BY
        id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllHealthfacilityStatewithdateCount() {
    return `SELECT count(*) as total
        FROM healthfacilityaccount WHERE state = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static getAllHealthfacilityLga(pageSize: number, offset: number) {
    return `SELECT * 
        FROM healthfacilityaccount WHERE state = ? AND lga = ?  ORDER BY
        id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllHealthfacilityLgaCount() {
    return `SELECT count(*) as total 
        FROM healthfacilityaccount WHERE state = ? AND lga = ?`;
  }
  static getAllHealthfacilityLgawithdate(pageSize: number, offset: number) {
    return `SELECT * 
        FROM healthfacilityaccount WHERE state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?  ORDER BY
        id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllHealthfacilityLgawithdateCount() {
    return `SELECT count(*) as total 
        FROM healthfacilityaccount WHERE state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
}
