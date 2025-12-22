import { Router } from "express";
import aiController from "../controllers/aiController.js";

const router = Router();

// POST route to ask AI question with task context
router.post("/ask", aiController.aiController);

export default router;
