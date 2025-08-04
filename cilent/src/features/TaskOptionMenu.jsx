import { useState } from "react";
import { MoreVertical } from "lucide-react";
import EditTaskDialog from "@/features/dialogs/EditTaskDialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/Button";
import useTasksStore from "@/store/TasksStore";
import ViewTaskDialog from "./dialogs/ViewTaskDialog";

export default function TaskOptionMenu({ task }) {
  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); //handling open / close menually
  const removeTask = useTasksStore((s) => s.removeTask);

  function handleDelete() {
    removeTask(task);
  }

  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      {/* Drop down menu */}
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button className="p-1">
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <EditTaskDialog task={task} onEditComplete={() => setMenuOpen(false)}>
            <DropdownMenuItem
              onSelect={(e) => {
                onClick(e);
              }}
            >
              Edit Task
            </DropdownMenuItem>
          </EditTaskDialog>

          <ViewTaskDialog task={task} onEditComplete={() => setMenuOpen(false)}>
            <DropdownMenuItem
              onSelect={(e) => {
                onClick(e);
              }}
            >
              View Task
            </DropdownMenuItem>
          </ViewTaskDialog>

          <DropdownMenuItem
            onSelect={(e) => {
              onClick(e);
              setDeleteDialogState(true);
            }}
          >
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* dialog if to delete a task */}
      <Dialog open={deleteDialogState} onOpenChange={setDeleteDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
