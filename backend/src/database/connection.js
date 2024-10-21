import mysql from "mysql2/promise";
import { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD, DB_PORT } from "../config.js";

// Crear el pool de conexiones
export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para verificar la conexión
export const verifyDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("🗄️ Conexión exitosa a la base de datos");
    connection.release(); // Liberar conexión una vez verificada
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    throw error; // Volver a lanzar el error para que el servidor no inicie sin DB
  }
};
