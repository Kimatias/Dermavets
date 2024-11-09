import bcrypt from "bcrypt";
import { createAccessToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authModel } from "../models/auth.model.js";

export class authController {
  static async register(req, res) {
    const { id, email, password, confirmPassword, username } = req.body;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return res.status(400).json(["Las contraseñas no coinciden"]);
    }

    try {
      // Verificar si el email ya está registrado
      const singleEmail = await authModel.findByEmail(email);
      if (singleEmail.length > 0) {
        return res.status(400).json(["El correo ya está registrado"]);
      }

      // Verificar si el username ya está registrado
      const singleUsername = await authModel.findByUsername(username);
      if (singleUsername.length > 0) {
        return res.status(400).json(["El usuario ya está registrado"]);
      }

      // Hashear el password
      const passwordHash = await bcrypt.hash(password, 10);

      // Insertar el nuevo usuario en la base de datos
      await authModel.insert(id, username, email, passwordHash);

      // Obtener el usuario recién creado para obtener el ID
      const [customer] = await authModel.findByEmail(email);

      // Generar el token de acceso JWT
      const token = await createAccessToken({ id: customer.id_cliente });

      // Establecer cookie con el token
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      // Responder con éxito
      return res.status(201).json({
        message: "Usuario registrado con éxito",
      });
    } catch (error) {
      console.error("Error al registrar usuario: ", error); // Log en servidor
      return res.status(500).json({
        message: "Error al registrar el usuario",
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Buscar al cliente en la base de datos por su correo electrónico
      const [customer] = await authModel.findByEmail(email);

      // Si el cliente no existe, enviar una respuesta de error
      if (!customer) {
        return res
          .status(400)
          .json({ message: "El email o la contraseña son incorrectos." });
      }

      // Comparar la contraseña ingresada con la almacenada (hasheada)
      const isMatch = await bcrypt.compare(password, customer.password);

      // Si la contraseña no coincide, enviar una respuesta de error
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "El email o la contraseña son incorrectos." });
      }

      // Crear y guardar el token de acceso JWT en una cookie
      const token = await createAccessToken({ id: customer.id_cliente });

      // Establecer cookie con el token
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      // Enviar una respuesta de éxito con los datos del cliente
      return res.status(200).json({
        message: "Inicio de sesión exitoso.",
      });
    } catch (error) {
      console.error("❌ Error del servidor:", error);
      return res
        .status(500)
        .json({ message: "Error del servidor, por favor intente más tarde." });
    }
  }

  static async verifyToken(req, res) {
    const { token } = req.cookies;
    try {
      // Verifica si el token está presente
      if (!token) {
        return res
          .status(401)
          .json({ message: "No se encontró el token, autorización denegada" });
      }

      // Verifica y decodifica el token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Asegúrate de que decoded tenga la propiedad id
      if (!decoded || typeof decoded !== "object" || !decoded.id) {
        return res
          .status(401)
          .json({ message: "Token inválido, no se encontró el ID" });
      }

      try {
        // Busca al usuario en la base de datos utilizando MySQL
        const user = await authModel.verifyToken(decoded.id);

        // Verifica si el usuario fue encontrado
        if (!user || Object.keys(user).length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Retorna la información del usuario directamente del objeto
        return res.json({
          message: "Autorización exitosa",
        });
      } catch (error) {
        console.error(
          "❌ Error al verificar el token o acceder a la base de datos:",
          error.message
        );

        // En caso de error, devuelve una respuesta genérica de autorización denegada
        return res.status(401).json({ message: "Autorización denegada" });
      }
    } catch (error) {
      console.error("❌ Error en la verificación del token:", error.message);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async logout(req, res) {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.sendStatus(200);
  }
}
