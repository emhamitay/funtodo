import { Calendar } from "@/components/UpdatedCalendar.jsx";
import useTasksStore from "@/store/TasksStore";
//import mocked from '@/mock/mockTasks'

export function TaskCalendar({selectedDate, setSelectedDate}) {

  // pull tasks from store
  const tasks = useTasksStore((state) => state.tasks);
  // make the onDrop callback fn
  const moveTask = useTasksStore((state) => state.moveTask);
  function onDrop(item, date){
    moveTask(item.id, date);
  }

  return (
    <div className="tutorial-step-3">
      <Calendar
        mode="single"
        onDrop={onDrop}
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-lg border"
        showOutsideDays={true}
        tasks={tasks} // sending the tasks to the calender compoment
      />
    </div>
  );
}
