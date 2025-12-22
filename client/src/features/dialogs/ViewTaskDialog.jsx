import { mTask } from "@/models/mTask";
import useTasksStore from "@/store/TasksStore";
import CoreDialog from "./CoreDialog";

export default function ViewTaskDialog({ task, children }) {
  const taskParam = {
    name: task.name,
    description: task.description,
    isdone: task.isdone,
  };

  return (
    <CoreDialog
      title={`View Task Details`}
      description="Here’s everything you need to know about this task. Review its information to stay informed and keep your workflow aligned."
      viewMode={true}
      taskParams={taskParam}
    >
      {children}
    </CoreDialog>
  );
}
