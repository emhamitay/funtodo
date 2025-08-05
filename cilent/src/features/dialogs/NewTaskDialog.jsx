import { mTask } from "@/models/mTask";
import useTasksStore from "@/store/TasksStore";
import CoreDialog from "./CoreDialog";

export default function NewTaskDialog({ children }) {
  const createTask = useTasksStore((state) => state.createTask);

  const handleSubmit = ({ name, description }) => {
    //creating a new task object without a date (goes to inbox)
    const newTask = new mTask(name, description, null);
    console.log('NewTaskDialog creating task:', newTask);
    //update it on the store
    createTask(newTask);
  };

  return (
    <CoreDialog 
      title='Create New Task'
      description='Please enter the details of your new task below to keep your
            workflow organized.'
      submitValue='Create' 
      handleSubmit={handleSubmit}
    >
      {children}
    </CoreDialog>
  );
}
