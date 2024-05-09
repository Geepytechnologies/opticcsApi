export class StateQueries {
  static getAllStateNational(pageSize: number, offset: number) {
    return `SELECT *
          FROM stateaccount ORDER BY
          id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllStateNationalCount() {
    return `SELECT count(*) as total 
          FROM stateaccount`;
  }
  static getAllStateNationalwithdate(pageSize: number, offset: number) {
    return `SELECT * 
          FROM stateaccount AND DATE(createdat) BETWEEN ? AND ? ORDER BY
          id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  }
  static getAllstateNationalwithdateCount() {
    return `SELECT count(*) as total
          FROM stateaccount AND DATE(createdat) BETWEEN ? AND ?`;
  }
}
