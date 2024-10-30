import { pool } from "../database/connection.js"; // Usamos pool directamente

export class authCustomerModel {
  static async findCustomerByEmail(email) {
    let connection;
    try {
      // Obtener conexión del pool
      connection = await pool.getConnection();

      // Realizar la consulta
      const [result] = await connection.query(
        "SELECT * FROM clientes WHERE correo_electronico = ?",
        [email]
      );

      // Devolver el resultado de la consulta
      return result;
    } catch (error) {
      console.error("❌ Error al buscar cliente por email:", error.message);
      throw error;
    } finally {
      if (connection) connection.release(); // Liberar la conexión
    }
  }

  static async findCustomerByUsername(username) {
    let connection;
    try {
      // Obtener conexión del pool
      connection = await pool.getConnection();

      // Realizar la consulta
      const [result] = await connection.query(
        "SELECT * FROM clientes WHERE usuario = ?",
        [username]
      );

      // Devolver el resultado de la consulta
      return result;
    } catch (error) {
      console.error("❌ Error al buscar cliente por username:", error.message);
      throw error;
    } finally {
      if (connection) connection.release(); // Liberar la conexión
    }
  }

  static async insertCustomer(id, username, email, password) {
    let connection;
    try {
      // Obtener conexión del pool
      connection = await pool.getConnection();

      // Insertar el nuevo cliente
      const [result] = await connection.query(
        "INSERT INTO clientes (id_cliente, usuario, correo_electronico, password) VALUES (?, ?, ?, ?)",
        [id, username, email, password]
      );

      // Devolver el resultado de la inserción
      return result;
    } catch (error) {
      console.error("❌ Error al insertar cliente:", error.message);
      throw error;
    } finally {
      if (connection) connection.release(); // Liberar la conexión
    }
  }

  static async verifyTokenCustomer(id) {
    let connection;
    try {
      // Obtener conexión del pool
      connection = await pool.getConnection();

      // Realizar la consulta para verificar el token del cliente
      const [result] = await connection.query(
        "SELECT id_cliente, usuario, correo_electronico FROM clientes WHERE id_cliente = ?",
        [id]
      );

      // Devolver el resultado de la consulta
      return result;
    } catch (error) {
      console.error("❌ Error al verificar token del cliente:", error.message);
      throw error;
    } finally {
      if (connection) connection.release(); // Liberar la conexión
    }
  }
}
