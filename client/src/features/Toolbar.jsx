import { Button } from "@/components/Button";
import NewTaskDialog from "@/features/dialogs/NewTaskDialog.jsx";

export default function Toolbar() {
  return (
    <div className="tutorial-step-1">
      <NewTaskDialog>
        <Button className="w-full flex items-center gap-2 justify-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Task
        </Button>
      </NewTaskDialog>
    </div>
  );
}
