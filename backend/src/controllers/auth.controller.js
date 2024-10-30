import bcrypt from "bcrypt";
import { createAccessToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authCustomerModel } from "../models/auth.model.js";

/**
 * Controlador que maneja las solicitudes HTTP relacionadas con la autenticación
 * y gestión de clientes. Proporciona funciones para registro, inicio de sesión,
 * verificación de tokens, cierre de sesión, obtención y actualización de perfil.
 */
export class authCustomerController {
  /**
   * Registra un nuevo cliente en la base de datos.
   *
   * Este método maneja el registro de un nuevo cliente en la base de datos.
   * Verifica que el email y el username no estén ya registrados, y que las
   * contraseñas coincidan. Luego, crea un token de acceso JWT, lo guarda en
   * una cookie y responde con un estado de éxito.
   *
   * @param {Object} req - La solicitud HTTP que contiene los datos del cliente.
   * @param {Object} res - La respuesta HTTP que se enviará al cliente.
   * @returns {Promise<void>} - Respuesta HTTP con el estado del registro.
   *
   * @throws {Error} - Lanza un error si ocurre un problema en el servidor.
   */
  static async register(req, res) {
    const { id, email, password, confirmPassword, username} = req.body;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return res.status(400).json(["Las contraseñas no coinciden"]);
    }

    try {
      // Verificar si el email ya está registrado
      const singleEmail = await authCustomerModel.findCustomerByEmail(email);
      if (singleEmail.length > 0) {
        return res.status(400).json(["El correo ya está registrado"]);
      }

      // Verificar si el username ya está registrado
      const singleUsername = await authCustomerModel.findCustomerByUsername(
        username
      );
      if (singleUsername.length > 0) {
        return res.status(400).json(["El usuario ya está registrado"]);
      }

      // Hashear el password
      const passwordHash = await bcrypt.hash(password, 10);

      await authCustomerModel.insertCustomer(
        id,
        username,
        email,
        passwordHash,
      );

      // Generar el token
      const token = await createAccessToken({ id });

      // Establecer cookie con el token
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none", // Permite que el token sea enviado desde otros dominios
      });

      // Responder con éxito
      return res.status(201).json({
        message: "Usuario registrado con éxito",
        user: { username, email},
      });
    } catch (error) {
      console.error("Error al registrar usuario: ", error); // Log en servidor
      return res.status(500).json({
        message: "Error al registrar el usuario",
      });
    }
  }

  /**
   * Inicia la sesión de un cliente existente en la base de datos.
   *
   * Este método maneja el inicio de sesión de un cliente mediante la validación
   * de su correo electrónico y contraseña. Si las credenciales son válidas,
   * se genera un token de acceso JWT y se guarda en una cookie para su uso posterior.
   *
   * @param {Object} req - La solicitud HTTP que contiene los datos del cliente.
   * @param {string} req.body.email - El correo electrónico del cliente.
   * @param {string} req.body.password - La contraseña del cliente.
   * @param {Object} res - La respuesta HTTP que se enviará al cliente.
   * @returns {Promise<void>} - Respuesta HTTP con el estado del inicio de sesión.
   *
   * @throws {Error} - Lanza un error si ocurre un problema en el servidor.
   *
   */
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Buscar al cliente en la base de datos por su correo electrónico
      const [customer] = await authCustomerModel.findCustomerByEmail(email);
      console.log("🚀 ~ authCustomerController ~ login ~ customer:", customer)

      // Si el cliente no existe, enviar una respuesta de error
      if (!customer) {
        return res
          .status(400)
          .json({ message: "El email o la contraseña son incorrectos." });
      }

      // Comparar la contraseña ingresada con la almacenada (hasheada)
      const isMatch = await bcrypt.compare(password, customer.password);
      console.log("🚀 ~ authCustomerController ~ login ~ customer.contraseña:", customer.password)

      // Si la contraseña no coincide, enviar una respuesta de error
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "El email o la contraseña son incorrectos." });
      }

      // Crear y guardar el token de acceso JWT en una cookie
      const token = await createAccessToken({ id: customer.id_cliente});
      console.log("🚀 ~ authCustomerController ~ login ~ token:", token)
      // Establecer cookie con el token
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none", // Permite que el token sea enviado desde otros dominios
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

  /**
   * Verifica la autenticación del usuario mediante un token JWT.
   *
   * Este método verifica la presencia y validez del token JWT en la solicitud,
   * y si es válido, devuelve la información del usuario asociado en la base de datos.
   *
   * @param {Object} req - La solicitud HTTP que contiene los datos del cliente.
   * @param {string} req.cookies.token - El token JWT que se verificará.
   * @param {Object} res - La respuesta HTTP que se enviará al cliente.
   * @returns {Promise<void>} - Respuesta HTTP con el estado del inicio de sesión.
   *
   * @throws {Error} - Lanza un error si ocurre un problema en el servidor.
   *
   */
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
        const user = await authCustomerModel.verifyTokenCustomer(decoded.id);

        // Verifica si el usuario fue encontrado
        if (!user || Object.keys(user).length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Retorna la información del usuario directamente del objeto
        return res.json({
          message: "Autorización exitosa",
          id: user[0].id_customer,
          username: user[0].username,
          email: user[0].email,
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

  /**
   * Cierra la sesión del cliente autenticado eliminando el token de acceso de la cookie.
   *
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   *
   * @returns {Promise<void>} - No devuelve nada, solo cierra la sesión y devuelve un estado 200.
   */
  static async logout(req, res) {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
    });

    return res.sendStatus(200);
  }
}
