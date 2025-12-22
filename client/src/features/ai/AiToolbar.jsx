import { useState } from "react";
import { Button } from "@/components/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import aiService from "@/lib/aiService";

export default function AiToolbar() {
  const [aiQuestion, setAiQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAskAi() {
    if (!aiQuestion.trim()) return;

    try {
      setLoading(true);

      const answer = await aiService({
        question: aiQuestion,
      });

      //console.log(answer);
    } catch (error) {
      console.error("AI request failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tutorial-step-5 flex-1 flex items-center gap-2">
      <Label htmlFor="ai_input">AI:</Label>

      <Input
        id="ai_input"
        value={aiQuestion}
        onChange={(e) => setAiQuestion(e.target.value)}
        placeholder="e.g. I need to build a website"
        className="flex-1"
        disabled={loading}
      />

      <Button onClick={handleAskAi} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </Button>
    </div>
  );
}
