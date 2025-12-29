/**
 * AI Controller
 *
 * Wraps calls to `aiService.askAI` and validates input.
 */
import aiService from "../services/aiService.js";

/**
 * POST /openai/ask
 * @param {express.Request} req
 * @param {express.Response} res
 */
const aiController = async (req, res) => {
  try {
    const { question, userTasks } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question cannot be empty" });
    }

    const answer = await aiService.askAI(question, userTasks || []);

    res.json({
      success: true,
      data: answer,
    });
  } catch (error) {
    console.error("AI Controller error - Full details:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process AI request",
    });
  }
};

export default { aiController };
