const API_URL = import.meta.env.VITE_OPENAI_URL;

const aiService = async ({ question }) => {
  // Make POST request to the backend AI endpoint
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch AI answer");
    }
    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("AI Service error:", error);
    throw error;
  }
};

export default aiService;
