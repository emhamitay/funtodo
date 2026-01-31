import { useEffect, useState } from "react";
import useTasksStore from "../store/TasksStore";
import { mTask } from "../models/mTask";

const Mocker = ({ run }) => {
  const { tasks, userId, isOnline, createTask, removeTask } = useTasksStore();

  const [aleardyMocked, setAleardyMocked] = useState(false);

  useEffect(() => {
    if (!run) return;
    if (isOnline || userId || aleardyMocked) return;

    (async () => {
      if (tasks.length) {
        await Promise.all(tasks.map((task) => removeTask(task)));
      }

      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const samples = [
        new mTask(
          "Demo: Welcome to emhlist",
          "Drag me where ever you want",
          null,
        ),
        new mTask(
          "Demo: Watch the tasks of today",
          "You have aleardy done this",
          now,
          undefined,
          true,
        ),
        new mTask(
          "Contect Amitay Englender",
          "after contacting you can set to for true",
          tomorrow,
        ),
      ];

      for (const task of samples) {
        await createTask(task);
      }

      setAleardyMocked(true);
    })();
  }, []);

  return <></>;
};

export default Mocker;
