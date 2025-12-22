import aiService from "../services/aiService.js";

const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await aiService.ask(question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: "Failed to get answer from AI service" });
  }
};
export default { askQuestion };
