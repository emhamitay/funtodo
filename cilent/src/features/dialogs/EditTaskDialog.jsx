import { mTask } from "@/models/mTask";
import useTasksStore from "@/store/TasksStore";
import CoreDialog from "./CoreDialog";

export default function EditTaskDialog({ task, children , onEditComplete }) {
  
  const originalTask = task;
  const taskParams = {
    name: originalTask.name,
    description: originalTask.description,
  };

  const editTask = useTasksStore((state) => state.editTask);
  const handleSubmit = ({ name, description }) => {
    //creating a new task object with all original fields
    const updatedTask = new mTask(
      name, 
      description, 
      originalTask.date,
      originalTask.id,
      originalTask.isdone,
      originalTask.priority
    );
    //update it on the store
    editTask(updatedTask);
    //on edit complete - closes the drop down menu
    onEditComplete();
  };

  return (
    <CoreDialog
      title="Edit an existing task"
      description="Make changes to your task below to keep your workflow accurate and up to date."
      submitValue="Edit"
      handleSubmit={handleSubmit}
      taskParams={taskParams}
    >
      {children}
    </CoreDialog>
  );
}
