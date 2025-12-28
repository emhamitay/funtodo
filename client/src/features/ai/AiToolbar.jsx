import { useState } from "react";
import { Button } from "@/components/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import aiService from "@/lib/aiService";
import useTasksStore from "@/store/TasksStore";
import { mTask } from "@/models/mTask";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AiToolbar() {
  const [aiQuestion, setAiQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [applying, setApplying] = useState(false);
  const [createDateMode, setCreateDateMode] = useState("suggested"); // suggested | inbox

  const tasks = useTasksStore((state) => state.tasks);
  const createTask = useTasksStore((state) => state.createTask);
  const editTask = useTasksStore((state) => state.editTask);
  const removeTask = useTasksStore((state) => state.removeTask);

  // Normalize incoming date values from AI (string/Date/null -> Date|null)
  const normalizeDateValue = (value) => {
    if (value === undefined || value === null || value === "") return null;
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  // Apply AI-generated changes
  const applyAiActions = async (actions) => {
    try {
      if (actions.create && actions.create.length > 0) {
        for (const taskData of actions.create) {
          const dateToUse =
            createDateMode === "suggested"
              ? normalizeDateValue(taskData.date)
              : null;
          const newTask = new mTask(
            taskData.name,
            taskData.description || "",
            dateToUse,
            null,
            false,
            0
          );
          await createTask(newTask);
        }
        toast.success(`Created ${actions.create.length} task(s)`);
      }

      if (actions.update && actions.update.length > 0) {
        for (const updateData of actions.update) {
          const taskToUpdate = tasks.find(
            (t) => String(t.id) === String(updateData.id)
          );
          if (taskToUpdate) {
            const resolvedDate =
              updateData.date === undefined
                ? taskToUpdate.date
                : normalizeDateValue(updateData.date);
            const updatedTask = new mTask(
              updateData.name !== undefined
                ? updateData.name
                : taskToUpdate.name,
              updateData.description !== undefined
                ? updateData.description
                : taskToUpdate.description,
              resolvedDate,
              taskToUpdate.id,
              updateData.isdone !== undefined
                ? updateData.isdone
                : taskToUpdate.isdone,
              taskToUpdate.groupIndex
            );
            await editTask(updatedTask);
          }
        }
        toast.success(`Updated ${actions.update.length} task(s)`);
      }

      if (actions.delete && actions.delete.length > 0) {
        for (const taskId of actions.delete) {
          const taskToRemove = tasks.find(
            (t) => String(t.id) === String(taskId)
          );
          if (taskToRemove) {
            await removeTask(taskToRemove);
          }
        }
        toast.success(`Deleted ${actions.delete.length} task(s)`);
      }
    } catch (error) {
      console.error("Error applying AI actions:", error);
      toast.error("Failed to apply some changes");
    }
  };

  async function handleAskAi() {
    if (!aiQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }

    try {
      setLoading(true);

      const response = await aiService({
        question: aiQuestion,
        // Normalize IDs to strings so AI echoes them back consistently
        userTasks: tasks.map((t) => ({ ...t, id: String(t.id) })),
      });

      // Show the AI message
      toast.info(response.message || "Here's what I suggest");

      // Check if there are any actions to apply
      const hasActions =
        response.actions?.create?.length > 0 ||
        response.actions?.update?.length > 0 ||
        response.actions?.delete?.length > 0;

      if (hasActions) {
        // Store pending changes and show preview dialog
        setPendingChanges(response);
        setShowPreview(true);
      } else {
        // No changes needed
        toast.success("No changes needed");
      }

      setAiQuestion("");
    } catch (error) {
      console.error("AI request failed:", error);
      toast.error(error.message || "Failed to process your request");
    } finally {
      setLoading(false);
    }
  }

  const handleApproveChanges = async () => {
    if (applying) return;
    setApplying(true);

    // Close dialog first to avoid showing "Unknown task" during deletion
    setShowPreview(false);

    // Show a loading toast
    const loadingToast = toast.loading("Applying changes...");

    try {
      if (pendingChanges?.actions) {
        await applyAiActions(pendingChanges.actions);
        toast.dismiss(loadingToast);
        if (pendingChanges.summary) {
          toast.success(pendingChanges.summary);
        }
      }
      setPendingChanges(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to apply changes");
    } finally {
      setApplying(false);
    }
  };

  const handleRejectChanges = () => {
    if (applying) return;
    toast.info("Changes cancelled");
    setShowPreview(false);
    setPendingChanges(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleAskAi();
    }
  };

  return (
    <>
      <div className="tutorial-step-5 flex-1 flex items-center gap-2">
        <Label htmlFor="ai_input">AI:</Label>
        <Input
          id="ai_input"
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your tasks..."
          className="flex-1"
          disabled={loading}
        />
        <Button onClick={handleAskAi} disabled={loading || applying}>
          {loading ? "Thinking..." : "Ask"}
        </Button>
      </div>

      {/* Preview Changes Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview AI Changes</DialogTitle>
            <DialogDescription>{pendingChanges?.message}</DialogDescription>
          </DialogHeader>

          {/* Date mode selector for created tasks */}
          {pendingChanges?.actions?.create?.length > 0 && (
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <div>
                <p className="text-sm font-semibold">New tasks dates</p>
                <p className="text-xs text-muted-foreground">
                  Choose whether to use AI suggested dates or send to Inbox
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={
                    createDateMode === "suggested" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCreateDateMode("suggested")}
                >
                  Use suggested dates
                </Button>
                <Button
                  variant={createDateMode === "inbox" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCreateDateMode("inbox")}
                >
                  Inbox (no date)
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {pendingChanges?.actions?.create?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">
                  📝 Create ({pendingChanges.actions.create.length})
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {pendingChanges.actions.create.map((task, idx) => (
                    <li key={idx} className="text-sm">
                      {task.name}
                      {task.description && (
                        <span className="text-muted-foreground">
                          {" "}
                          - {task.description}
                        </span>
                      )}{" "}
                      <span className="text-xs text-muted-foreground">
                        {task.date ? `(Due: ${task.date})` : "(Inbox)"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pendingChanges?.actions?.update?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">
                  ✏️ Update ({pendingChanges.actions.update.length})
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {pendingChanges.actions.update.map((update, idx) => {
                    const task = tasks.find(
                      (t) => String(t.id) === String(update.id)
                    );
                    return (
                      <li key={idx} className="text-sm">
                        {task?.name || "Unknown task"}
                        {update.isdone !== undefined && (
                          <span className="text-green-600">
                            {" "}
                            → Mark as {update.isdone ? "done" : "not done"}
                          </span>
                        )}
                        {update.date !== undefined && (
                          <span className="text-blue-600">
                            {" "}
                            → Due {update.date || "Inbox"}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {pendingChanges?.actions?.delete?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">
                  🗑️ Delete ({pendingChanges.actions.delete.length})
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {pendingChanges.actions.delete.map((id, idx) => {
                    const task = tasks.find((t) => String(t.id) === String(id));
                    return (
                      <li key={idx} className="text-sm text-red-600">
                        {task?.name || "Unknown task"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {pendingChanges?.summary && (
              <div className="bg-muted p-3 rounded-md mt-4">
                <p className="text-sm">{pendingChanges.summary}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleRejectChanges}
              disabled={applying}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApproveChanges}
              autoFocus
              disabled={applying}
            >
              {applying ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden="true"
                  ></span>
                  Applying...
                </span>
              ) : (
                "Apply Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
