export class AncvisitQueries {
  static getUserLastANC() {
    return `SELECT *
        FROM ancvisit
        WHERE patient_id = ?
        ORDER BY createdat DESC
        LIMIT 1;
         `;
  }
  static createancvisit() {
    return `INSERT INTO ancvisit (
                patient_id,
                healthpersonnel_id,
                anc_number,
                lastANC,
                missed,
                attended) VALUES (?,?,?,?,?,?);`;
  }
  static updateancvisit() {
    return `UPDATE ancvisit
    SET
        healthpersonnel_id = ?,
        anc_number = ?,
        lastANC = ?,
        missed = ?, 
        attended = ?
    WHERE
        patient_id = ?
    ;`;
  }
}
