import bcrypt from "bcrypt";
import { createAccessToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { profileModel } from "../models/profile.model.js";

export class profileController {
  static async getProfile(req, res) {
    const { token } = req.cookies;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await profileModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateImagen(req, res) {
    const { token } = req.cookies;

    // Verificar que el token exista
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado." });
    }

    // Verificar que la imagen haya sido cargada
    if (!req.files?.image) {
      return res
        .status(400)
        .json({ message: "No se ha proporcionado ninguna imagen." });
    }

    try {
      // Verificar y decodificar el token
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded?.id) {
        return res.status(401).json({ message: "Token inválido." });
      }

      // Subir la imagen
      const result = await uploadImage(req.files.image.tempFilePath);

      // Obtener URL y public_id de la imagen
      const imageUrl = result.secure_url;
      const publicId = result.public_id;

      // Actualizar la imagen de perfil en la base de datos
      await profileModel.updateImageProfile(decoded.id, imageUrl, publicId);


      // Responder con éxito
      return res
        .status(200)
        .json({ message: "Imagen de perfil actualizada exitosamente." });
    } catch (error) {
      console.error("❌ Error al actualizar imagen del usuario:", error);
      return res.status(500).json({ message: error.message });
    }
  }
}
