import { verifyDBConnection } from "../database/connection.js";
const connection = await verifyDBConnection();

export class authCustomerModel {
  static async findCustomerByEmail(email) {
    const [result] = await connection.query(
      "SELECT * FROM customer WHERE email = ?",
      [email]
    );
    connection.release();
    return result;
  }
}
