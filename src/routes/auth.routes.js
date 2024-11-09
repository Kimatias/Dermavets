import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
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


router.get("/verify", authController.verifyToken);
router.get("/getUser", userController.getUser);

export default router;
