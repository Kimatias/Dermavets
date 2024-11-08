import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import {userController} from "../controllers/user.controller.js";

const router = Router();

router.post(
  "/register",
  validateSchema(registerSchema),
  authController.register
);

router.post("/login", validateSchema(loginSchema), authController.login);

router.post("/logout", authRequired, authController.logout);

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
