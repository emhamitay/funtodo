import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function Form({
  handleSubmit,
  submitValue,
  setOpen,
  taskParams = {
    name: "",
    description: "",
    isdone: false,
  },
}) {
  const [name, setName] = useState(taskParams.name);
  const [description, setDescription] = useState(taskParams.description);
  const [isdone, setIsdone] = useState(taskParams.isdone ?? false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onParentSubmit(e);
    }
  };

  function onParentSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Hey! Give your task a name");
      return;
    }

    handleSubmit({ name, description, isdone });

    setOpen(false); //Closing the dialog automatic
  }

  return (
    <form onSubmit={onParentSubmit} className="space-y-4 mt-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="task-name">Task Name</Label>
        <Input
          id="task-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          placeholder="Enter task name"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="task-desc">Description</Label>
        <Textarea
          id="task-desc"
          className="w-full resize-none h-40 overflow-auto break-all whitespace-pre-wrap"
          value={description}
          onKeyDown={handleKeyDown}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional task description"
          rows={3}
        />
      </div>

      {taskParams.isdone !== undefined && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="task-done"
            checked={isdone}
            onCheckedChange={setIsdone}
          />
          <Label htmlFor="task-done" className="cursor-pointer">
            Mark as {isdone ? "not done" : "done"}
          </Label>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>

        <Button type="submit">{submitValue}</Button>
      </div>
    </form>
  );
}
