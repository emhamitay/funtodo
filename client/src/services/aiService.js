import { OPENAI_API_ASK } from "./api.js";

const aiService = async ({ question, userTasks = [] }) => {
  try {
    const response = await fetch(OPENAI_API_ASK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        userTasks,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to get response from AI");
    }

    return data.data;
  } catch (error) {
    console.error("AI Service error:", error);
    throw error;
  }
};

export default aiService;
