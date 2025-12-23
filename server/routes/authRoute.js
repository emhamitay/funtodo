import { Router } from "express";
import authController from "../controllers/authController.js";

const router = new Router();

router.post("/login/", authController.LoginUser);
router.post("/register/", authController.RegisterUser);
router.post("/reset/", authController.Reset);

export default router;
