/*
This line builds a human-readable string like:
 "7 July 2025"
Here’s how it works:
- d.getDate() → returns the day of the month (e.g., 7)
- d.toLocaleString('default', { month: 'long' }) → returns the full name of the month (e.g., "July")
- 'en-US' uses english ('default' uses the browser's or system's locale)
- { month: 'long' } ensures the full month name (e.g., "July" instead of "Jul" or "07")
- d.getFullYear() → returns the 4-digit year (e.g., 2025)
*/
import { isSameDay } from "date-fns";
import taskStore from "@/store/TasksStore";
import { DroppableSortableWrapper, SortableDraggable } from "bhi-dnd";
import { ConvertDateToYMD } from "@/lib/utils";
import Task from "@/features/Task.jsx";

export default function TasksView({ selectedDate }) {
  const d = ConvertDateToYMD(selectedDate);
  const weekday = d.toLocaleString("en-US", { weekday: "long" });
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();

  const formattedDate = `${weekday} ${day} ${month} ${year}`;

  const moveTask = taskStore((s) => s.moveTask);

  function onDrop(item) {
    moveTask(item.id, d);
  }

  const tasks = taskStore((s) => s.tasks);
  const date_tasks = tasks.filter((t) => isSameDay(t.date, d));
  date_tasks.sort((a, b) => a.groupIndex - b.groupIndex);

  return (
    <div className="h-full w-full tutorial-step-4">
      <DroppableSortableWrapper
        indexKey="groupIndex"
        id="tasks_view"
        onDrop={onDrop}
        className="h-full w-full"
      >
        <div className="prose w-full h-full p-1">
          <h3>Tasks for {formattedDate}: </h3>
          {date_tasks.map((task) => (
            <SortableDraggable key={task.id} id={task.id}>
              <Task task={task} index={task.groupIndex} key={task.id} />
            </SortableDraggable>
          ))}
        </div>
      </DroppableSortableWrapper>
    </div>
  );
}
