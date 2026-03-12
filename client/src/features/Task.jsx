import taskStore from "@/store/TasksStore";
import TaskOptionMenu from "@/features/TaskOptionMenu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

const MAX_DESCRIPTION = 20;

export default function Task({ task }) {
  const checkboxName = `isDone-${task.id}`;
  const updateIsDone = taskStore((s) => s.updateIsDone);
  function handleCheck(value) {
    updateIsDone(task, value);
  }

  function shortDescription(longDescription) {
    let result = longDescription;
    if (result.length > MAX_DESCRIPTION) {
      result = result.slice(0, MAX_DESCRIPTION) + "...";
    }
    return result;
  }
  const description = shortDescription(task.description);

  return (
    <div
      className={clsx(
        "px-3 py-2.5 rounded-lg border transition-colors duration-150",
        !task.isdone
          ? "bg-white border-blue-100 hover:border-blue-200"
          : "bg-green-50/60 border-green-100 hover:border-green-200",
      )}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 mb-1">
        <Checkbox
          id={checkboxName}
          checked={task.isdone}
          onCheckedChange={handleCheck}
          className="shrink-0 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-300"
        />
        <Label
          htmlFor={checkboxName}
          className={clsx(
            "text-sm font-semibold leading-tight cursor-pointer",
            task.isdone ? "line-through text-blue-300" : "text-blue-950",
          )}
        >
          {task.name}
        </Label>
        <TaskOptionMenu task={task} className="ml-auto" />
      </div>
      {/* Description */}
      {description !== "" && (
        <p className="text-[11px] text-blue-400 whitespace-pre-line line-clamp-2 pl-6 leading-snug">
          {description}
        </p>
      )}
    </div>
  );
}
