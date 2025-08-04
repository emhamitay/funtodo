import { Button } from "@/components/Button";
import NewTaskDialog from "@/features/dialogs/NewTaskDialog.jsx";

export default function Toolbar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row tutorial-step-1">
        <NewTaskDialog>
            <Button className="w-52">New Task</Button>
        </NewTaskDialog>
    </div>
  );
}
