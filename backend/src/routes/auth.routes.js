import { Router } from "express";
import { authCustomerController } from "../controllers/auth.controller.js";
import {userController} from "../controllers/user.controller.js";

const router = Router();

/**
 * @route POST /registerCustomer
 * @description Ruta para el registro de nuevos clientes. Valida los datos de entrada
 * utilizando el esquema definido en registerSchema. Llama al método registerCustomer
 * del controlador authCustomerController.
 * @middleware validateSchema(registerSchema) - Valida que los datos del cliente
 * cumplan con el esquema definido.
 * @controller authCustomerController.registerCustomer - Controlador encargado de
 * registrar al cliente en el sistema.
 */
router.post(
  "/register",
  authCustomerController.register
);

/**
 * @route POST /loginCustomer
 * @description Ruta para el inicio de sesión de clientes. Valida los datos de
 * entrada utilizando el esquema definido en loginSchema. Llama al método
 * loginCustomer del controlador authCustomerController.
 * @middleware validateSchema(loginSchema) - Valida que los datos ingresados
 * para el login cumplan con el esquema definido.
 * @controller authCustomerController.loginCustomer - Controlador encargado
 * de iniciar sesión en el sistema.
 */
router.post(
  "/login",
  authCustomerController.login
);

/**
 * @route POST /logoutCustomer
 * @description Ruta para cerrar la sesión del cliente. No requiere validación
 * de esquema ya que simplemente cierra la sesión activa. Llama al método
 * logoutCustomer del controlador authCustomerController.
 * @controller authCustomerController.logoutCustomer - Controlador encargado
 * de cerrar la sesión.
 */
router.post("/logout", authCustomerController.logout);

/**
 * @route GET /verifyCustomer
 * @description Ruta para verificar la validez del token de autenticación del cliente.
 * No requiere validación de datos ya que sólo verifica el token existente.
 * @controller authCustomerController.verifyTokenCustomer - Controlador encargado
 * de verificar el token del cliente.
 */
router.get("/verify", authCustomerController.verifyToken);
router.get("/getUser", userController.getUser);

export default router;
