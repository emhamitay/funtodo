import { Router } from "express";
import aiController from "../controllers/aiController.js";

const router = Router();

// Example POST route to ask a question
router.post("/ask", aiController.askQuestion);

export default router;
