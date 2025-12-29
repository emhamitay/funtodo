/**
 * AI Routes
 *
 * POST /ask - Ask AI for suggestions with optional task context.
 */
import { Router } from "express";
import aiController from "../controllers/aiController.js";

const router = Router();

// POST route to ask AI question with task context
router.post("/ask", aiController.aiController);

export default router;
