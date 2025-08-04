import React, { useState } from "react";
import Form from "@/features/dialogs/Form";
import View from '@/features/dialogs/View'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CoreDialog({
  title,
  description,
  children,
  handleSubmit,
  submitValue,
  taskParams,
  viewMode = false,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {!viewMode ? (
          <Form
            taskParams={taskParams}
            setOpen={setOpen}
            submitValue={submitValue}
            handleSubmit={handleSubmit}
          />
        ) : (
          <View taskParams={taskParams} />
        )}
      </DialogContent>
    </Dialog>
  );
}
