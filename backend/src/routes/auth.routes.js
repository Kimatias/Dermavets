import { Router } from "express";
<<<<<<< HEAD
import { authCustomerController } from "../controllers/auth.controller.js";
import {userController} from "../controllers/user.controller.js";

=======
import { authController } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
>>>>>>> dev
const router = Router();

router.post(
  "/register",
  validateSchema(registerSchema),
  authController.register
);

router.post("/login", validateSchema(loginSchema), authController.login);

router.post("/logout", authRequired, authController.logout);

<<<<<<< HEAD
/**
 * @route GET /verifyCustomer
 * @description Ruta para verificar la validez del token de autenticación del cliente.
 * No requiere validación de datos ya que sólo verifica el token existente.
 * @controller authCustomerController.verifyTokenCustomer - Controlador encargado
 * de verificar el token del cliente.
 */
router.get("/verify", authCustomerController.verifyToken);
router.get("/getUser", userController.getUser);
=======
router.get("/verifyToken", authController.verifyToken);
>>>>>>> dev

export default router;
