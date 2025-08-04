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
    <div className="h-full tutorial-step-2">
      <DroppableSortableWrapper
        onSorted={onSort}
        indexKey="groupIndex"
        id="inbox"
        items={filteredTasks}
        onDrop={onDrop}
        className="h-full"
      >
        <div className="flex flex-col gap-3">
        {filteredTasks.map((task) => (
          <SortableDraggable key={task.id} id={task.id}>
            <Task task={task} />
          </SortableDraggable>
          
        ))}
        </div>
      </DroppableSortableWrapper>
    </div>
  );
}
