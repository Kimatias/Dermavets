import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import {userModel} from "../models/user.model.js";

export class userController {
  
  
  static async getUser(req, res) {
    const { token } = req.cookies;
    try {
      // Verifica si el token está presente
      if (!token) {

        return res
          .status(401)
          .json({ message: "No se encontró el token, autorización denegada" });
      }
      console.log(token)

      // Verifica y decodifica el token
      const decoded = jwt.verify(token, JWT_SECRET);

      console.log(decoded)

      // Asegúrate de que decoded tenga la propiedad id
      if (!decoded || typeof decoded !== "object" || !decoded.id) {
        return res
          .status(401)
          .json({ message: "Token inválido, no se encontró el ID" });
      }
     try {
        
        const user = await userModel.getUserModel(decoded.id); // Suponiendo que tienes un método que obtiene el usuario por ID

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        console.log(user)

        return res.status(200).json({ user });
        
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
}
  }
}
