/*
This line builds a human-readable string like:
 "7 July 2025"
Here's how it works:
- d.getDate() → returns the day of the month (e.g., 7)
- d.toLocaleString('default', { month: 'long' }) → returns the full name of the month (e.g., "July")
- 'en-US' uses english ('default' uses the browser's or system's locale)
- { month: 'long' } ensures the full month name (e.g., "July" instead of "Jul" or "07")
- d.getFullYear() → returns the 4-digit year (e.g., 2025)
*/
import { isSameDay } from "date-fns";
import taskStore from "@/store/TasksStore";
import {
  DroppableSortableWrapper,
  SortableDraggable,
} from "@emhamitay/ghostdrop";
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
  const tasks = taskStore((s) => s.tasks);
  const isOnline = taskStore((s) => s.isOnline);
  const userId = taskStore((s) => s.userId);
  const updateGroupIndex = taskStore((s) => s.updateGroupIndex);

  function onDrop(item) {
    moveTask(item.id, d);
  }

  const date_tasks = tasks.filter((t) => isSameDay(t.date, d));
  date_tasks.sort((a, b) => a.groupIndex - b.groupIndex);

  return (
    <div className="h-full w-full tutorial-step-4 flex flex-col gap-3">
      {/* Date header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-950 tracking-tight leading-tight">
              {formattedDate}
            </p>
            {date_tasks.length > 0 && (
              <p className="text-[10px] text-blue-400 leading-tight">
                {date_tasks.length} task{date_tasks.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        {/* Status dot */}
        <div className="flex items-center gap-1.5">
          <div
            className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-400" : "bg-yellow-400"}`}
          />
          <span className="text-[10px] text-blue-400">
            {isOnline ? "Online" : "Offline"}
          </span>
          {!userId && (
            <span className="text-[10px] text-blue-400">· Login to sync</span>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-blue-100" />

      <DroppableSortableWrapper
        indexKey="groupIndex"
        id="tasks_view"
        items={date_tasks}
        onSorted={updateGroupIndex}
        onDrop={onDrop}
        layoutAnimation="none"
        className="flex-1 w-full min-h-0"
      >
        <div className="flex flex-col gap-2 w-full h-full min-h-[200px] pb-4">
          {date_tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 rounded-xl border border-dashed border-blue-200">
              <svg
                className="w-8 h-8 text-blue-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-medium text-blue-300">
                No tasks for this day
              </p>
              <p className="text-xs text-blue-200 text-center leading-tight max-w-[220px]">
                Drag a task from the inbox, or use &ldquo;New Task&rdquo; above
              </p>
            </div>
          ) : (
            <>
              {date_tasks.map((task) => (
                <SortableDraggable key={task.id} id={task.id}>
                  <Task task={task} index={task.groupIndex} key={task.id} />
                </SortableDraggable>
              ))}
              {/* Drop zone below last task */}
              <div className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-dashed border-blue-100 mt-1">
                <svg
                  className="w-3 h-3 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="text-[10px] text-blue-300">Drop here to move to end</span>
              </div>
            </>
          )}
        </div>
      </DroppableSortableWrapper>
    </div>
  );
}
