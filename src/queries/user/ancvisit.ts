export class AncvisitQueries {
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
