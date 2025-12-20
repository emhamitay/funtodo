import { Button } from "@/components/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AiToolbar() {
  return (
    <div className="tutorial-step-5 flex-1 flex items-center gap-2">
      <Label htmlFor="ai_input">AI:</Label>
      <Input
        id="ai_input"
        placeholder="e.g I need to build a website"
        className="flex-1"
      />
      <Button> Ask</Button>
    </div>
  );
}
