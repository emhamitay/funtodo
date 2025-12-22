//This service interacts with the OpenAI API to get responses to user questions.
import { OpenAI } from "openai";
import { TASK_SYSTEM_PROMPT } from "./aiLogic.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askAI(question, userTasks = []) {
  try {
    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

    // Get the system prompt from aiLogic with current date
    const systemPrompt = TASK_SYSTEM_PROMPT(userTasks, currentDate);

    // Call OpenAI with the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);
    return parsedResponse;
  } catch (err) {
    console.error("AI Service error - Full details:", {
      message: err.message,
      stack: err.stack,
      response: err.response?.data
    });
    throw new Error(`Failed to process AI request: ${err.message}`);
  }
}

export default { askAI };
