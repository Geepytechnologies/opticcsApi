export class EnumeratorQueries{
    static createEnumerator() {
        return `INSERT INTO wards (state,lga,ward) VALUES (?,?,?)`;
    }
}