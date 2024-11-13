import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// Función para crear un token de acceso
export const createAccessToken = async (payload) => {
  try {
    // Generamos el token utilizando el payload, la clave secreta y un tiempo de expiración de 1 día
    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token; // Retornamos el token generado
  } catch (error) {
    console.error("❌ Error al generar el token:", error); // Registro del error
    throw new Error("Error al generar el token de acceso"); // Lanza un error más específico
  }
};
