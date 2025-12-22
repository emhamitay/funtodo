//This service interacts with the OpenAI API to get responses to user questions.
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function ask(question) {
  // Call the OpenAI API
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5-nano", // cheaper model
      service_tier: "flex", // use the flex tier for cost efficiency
      // service_tier: "standard", // use the standard tier for better performance
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
      // max_tokens: 200, // max tokens in the response... for now
    });

    console.log("Answer:", response.choices[0].message.content);
  } catch (err) {
    console.error("Error:", err);
  }
}
export default { ask };
