import Task from "@/features/Task";
import taskStore from "@/store/TasksStore";
import { DroppableSortableWrapper, SortableDraggable } from "bhi-dnd";

export default function Inbox() {
  const tasks = taskStore((s) => s.tasks);
  const filteredTasks = tasks.filter((task) => task.date == null);
  filteredTasks.sort((a, b) => a.groupIndex - b.groupIndex);

  const updateGroupIndex = taskStore((s) => s.updateGroupIndex);
  const moveTask = taskStore((s) => s.moveTask);
  function onSort(newItems) {
    updateGroupIndex(newItems);
  }
  function onDrop(item) {
    moveTask(item.id, null);
  }

  return (
    <div className="tutorial-step-2 flex flex-col gap-2">
      {/* Section header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100">
            <svg
              className="w-3.5 h-3.5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold text-blue-950 tracking-tight">
            Inbox
          </span>
        </div>
        {filteredTasks.length > 0 && (
          <span className="text-[10px] font-semibold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
            {filteredTasks.length}
          </span>
        )}
      </div>

      {/* Drop zone */}
      <DroppableSortableWrapper
        onSorted={onSort}
        indexKey="groupIndex"
        id="inbox"
        items={filteredTasks}
        onDrop={onDrop}
        className="flex-1"
      >
        <div className="flex flex-col gap-2 rounded-lg border border-dashed border-blue-200 p-2 min-h-[80px]">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-4 gap-1.5">
              <svg
                className="w-6 h-6 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-[11px] font-medium text-blue-400">
                Inbox is empty
              </p>
              <p className="text-[10px] text-blue-300 text-center leading-tight px-2">
                Drop tasks here or create a new one
              </p>
            </div>
          ) : (
            <>
              {filteredTasks.map((task) => (
                <SortableDraggable key={task.id} id={task.id}>
                  <Task task={task} />
                </SortableDraggable>
              ))}
              {/* Persistent drop target below the task list */}
              <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-dashed border-blue-100 mt-1">
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
                <span className="text-[10px] text-blue-300">Drop here</span>
              </div>
            </>
          )}
        </div>
      </DroppableSortableWrapper>
    </div>
  );
}
