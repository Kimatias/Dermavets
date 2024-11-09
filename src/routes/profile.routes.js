import { Router } from "express";
import { profileController } from "../controllers/profile.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/profile", authRequired, profileController.getProfile);

export default router;
