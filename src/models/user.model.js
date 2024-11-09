import { pool } from "../database/connection.js"; // Usamos pool directamente

export class userModel {
  static async getUserModel(id) {
    let connection;
    try {
      // Obtener conexión del pool
      connection = await pool.getConnection();

      // Realizar la consulta
      const [result] = await connection.query(
        "SELECT * FROM clientes WHERE id_cliente = ?",
        [id]
      );

      // Devolver el resultado de la consulta
      return result;
    } catch (error) {
      console.error("❌ Error al traer todos los usuarios:", error.message);
      throw error;
    } finally {
      if (connection) connection.release(); // Liberar la conexión
    }
  }

  
}
