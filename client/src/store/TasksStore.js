import { create } from "zustand";
import { mTask } from "@/models/mTask";
import { toast } from "sonner";

//getting environment variables
const API_URL_TASKS_CREATE = import.meta.env.VITE_API_TASKS_CREATE;
const API_URL_TASKS_GET_BY_USER_ID = import.meta.env
  .VITE_API_TASKS_GET_BY_USER_ID;
const API_URL_TASKS_UPDATE = import.meta.env.VITE_API_TASKS_UPDATE;
const API_URL_TASKS_DELETE = import.meta.env.VITE_API_TASKS_DELETE;
const API_URL_TASKS_TOGGLE_ISDONE = import.meta.env
  .VITE_API_TASKS_TOGGLE_ISDONE;

// Local storage keys
const LOCAL_TASKS_KEY = "funtodo_local_tasks";
const LOCAL_USER_ID_KEY = "funtodo_local_user_id";

// Helper function to save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
  try {
    localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to local storage:", error);
  }
};

// Helper function to load tasks from local storage
const loadTasksFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(LOCAL_TASKS_KEY);
    return stored
      ? JSON.parse(stored).map(
          (taskData) =>
            new mTask(
              taskData.name,
              taskData.description,
              taskData.date ? new Date(taskData.date) : null,
              taskData.id,
              taskData.isdone,
              taskData.groupIndex || 0
            )
        )
      : [];
  } catch (error) {
    console.error("Error loading tasks from local storage:", error);
    return [];
  }
};

// Helper function to save user ID to local storage
const saveUserIdToLocalStorage = (userId) => {
  try {
    localStorage.setItem(LOCAL_USER_ID_KEY, userId);
  } catch (error) {
    console.error("Error saving user ID to local storage:", error);
  }
};

// Helper function to load user ID from local storage
const loadUserIdFromLocalStorage = () => {
  try {
    return localStorage.getItem(LOCAL_USER_ID_KEY);
  } catch (error) {
    console.error("Error loading user ID from local storage:", error);
    return null;
  }
};

// Zustand store for managing task list with server synchronization and local storage fallback
const useTasksStore = create((set, get) => ({
  tasks: [],
  userId: null,
  isLoading: false,
  isOnline: false, // Track if user is logged in

  // Initialize store with local storage data
  initialize: () => {
    const localUserId = loadUserIdFromLocalStorage();
    const localTasks = loadTasksFromLocalStorage();

    set({
      tasks: localTasks,
      userId: localUserId,
      isOnline: !!localUserId,
    });
  },

  // Set user ID when logged in
  setUserId: (userId) => {
    set({ userId, isOnline: !!userId });
    if (userId) {
      saveUserIdToLocalStorage(userId);
    } else {
      localStorage.removeItem(LOCAL_USER_ID_KEY);
    }
  },

  // Load tasks from server or local storage
  loadTasks: async (userId) => {
    console.log("loadTasks called with userId:", userId);

    if (!userId) {
      console.log("No userId provided, loading from local storage");
      const localTasks = loadTasksFromLocalStorage();
      set({ tasks: localTasks, isOnline: false });
      return;
    }

    set({ isLoading: true });
    try {
      console.log("Sending loadTasks request to server");
      const response = await fetch(
        `${API_URL_TASKS_GET_BY_USER_ID}?userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("loadTasks server response:", data);
        const tasks = data.tasks.map((task) => mTask.fromServerData(task));
        console.log("Parsed tasks:", tasks);
        set({ tasks, userId, isOnline: true });
        console.log("Tasks loaded successfully from server");
      } else {
        console.error(
          "Failed to load tasks from server, falling back to local storage"
        );
        const localTasks = loadTasksFromLocalStorage();
        set({ tasks: localTasks, isOnline: false });
      }
    } catch (error) {
      console.error(
        "Error loading tasks from server, falling back to local storage:",
        error
      );
      const localTasks = loadTasksFromLocalStorage();
      set({ tasks: localTasks, isOnline: false });
    } finally {
      set({ isLoading: false });
    }
  },

  // Merge local tasks with server tasks when user logs in
  mergeLocalTasks: async (userId) => {
    const { tasks } = get();
    const localTasks = loadTasksFromLocalStorage();

    if (localTasks.length === 0) {
      console.log("No local tasks to merge");
      return;
    }

    console.log("Merging local tasks with server tasks");

    try {
      let mergedCount = 0;
      // Send each local task to server
      for (const localTask of localTasks) {
        const response = await fetch(API_URL_TASKS_CREATE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            title: localTask.name,
            description: localTask.description,
            dueDate: localTask.date,
            priority: localTask.priority,
          }),
        });

        if (response.ok) {
          console.log("Local task merged successfully:", localTask.name);
          mergedCount++;
        } else {
          console.error("Failed to merge local task:", localTask.name);
        }
      }

      // Clear local storage after successful merge
      localStorage.removeItem(LOCAL_TASKS_KEY);
      console.log("Local tasks merged and local storage cleared");

      // Show notification to user
      if (mergedCount > 0) {
        toast.success(
          `Awesome! ${mergedCount} local task${
            mergedCount > 1 ? "s" : ""
          } synced to your account.`
        );
      }
    } catch (error) {
      console.error("Error merging local tasks:", error);
      toast.error(
        "Oops! Couldn't sync your local tasks. They're still safe locally."
      );
    }
  },

  // Create a new task and sync with server or save locally
  createTask: async (task) => {
    const { tasks, userId, isOnline } = get();
    console.log("createTask called with:", { task, userId, isOnline });

    // Create new task with proper group index
    const relevantGroup = tasks.filter((t) => isSameGroup(t.date, task.date));
    task.groupIndex = relevantGroup.length;

    // Add to local state immediately
    const newTasks = [...tasks, task];
    set({ tasks: newTasks });

    // Save to local storage
    saveTasksToLocalStorage(newTasks);

    if (isOnline && userId) {
      try {
        console.log("Sending createTask request to server");
        const response = await fetch(API_URL_TASKS_CREATE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            title: task.name,
            description: task.description,
            dueDate: task.date,
            priority: task.priority,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("createTask server response:", data);
          // Update task with server ID if needed
          const updatedTask = mTask.fromServerData(data.task);
          set((state) => ({
            tasks: state.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
          }));
          console.log("Task created successfully on server");
        } else {
          console.error("Failed to create task on server, keeping local only");
        }
      } catch (error) {
        console.error(
          "Error creating task on server, keeping local only:",
          error
        );
      }
    } else {
      console.log("User not logged in, task saved locally only");
    }
  },

  // Edit name/description of a task by index and sync with server or save locally
  editTask: async (updatedTask) => {
    const { tasks, userId, isOnline } = get();

    // Update local state immediately
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return {
            ...task,
            name: updatedTask.name,
            description: updatedTask.description,
            isdone: updatedTask.isdone,
            date: updatedTask.date !== undefined ? updatedTask.date : task.date,
          };
        }
        return task;
      });
      return { tasks: updatedTasks };
    });

    // Save to local storage
    saveTasksToLocalStorage(get().tasks);

    if (isOnline && userId) {
      try {
        const response = await fetch(API_URL_TASKS_UPDATE, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId: updatedTask.id,
            title: updatedTask.name,
            description: updatedTask.description,
            completed: updatedTask.isdone,
            dueDate: updatedTask.date,
          }),
        });

        if (!response.ok) {
          console.error("Failed to update task on server, keeping local only");
        }
      } catch (error) {
        console.error(
          "Error updating task on server, keeping local only:",
          error
        );
      }
    }
  },

  // Toggle task completion status and sync with server or save locally
  updateIsDone: async (task, value) => {
    const { userId, isOnline } = get();

    // Update local state immediately
    set((state) => {
      const updatedTasks = [...state.tasks];
      const taskToUpdate = updatedTasks.find((t) => t.id == task.id);
      if (taskToUpdate) {
        taskToUpdate.isdone = value;
      }
      return { tasks: updatedTasks };
    });

    // Save to local storage
    saveTasksToLocalStorage(get().tasks);

    if (isOnline && userId) {
      try {
        const response = await fetch(API_URL_TASKS_TOGGLE_ISDONE, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId: task.id }),
        });

        if (!response.ok) {
          console.error("Failed to toggle task on server, keeping local only");
        }
      } catch (error) {
        console.error(
          "Error toggling task on server, keeping local only:",
          error
        );
      }
    }
  },

  // Remove task by index and sync with server or save locally
  removeTask: async (taskToRemove) => {
    const { userId, isOnline } = get();

    // Update local state immediately
    set((state) => {
      const tasksCopy = [...state.tasks];
      const index = tasksCopy.findIndex((t) => t.id === taskToRemove.id);

      if (index !== -1) {
        tasksCopy.splice(index, 1);
      }

      return { tasks: tasksCopy };
    });

    // Save to local storage
    saveTasksToLocalStorage(get().tasks);

    if (isOnline && userId) {
      try {
        const response = await fetch(API_URL_TASKS_DELETE, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId: taskToRemove.id }),
        });

        if (!response.ok) {
          console.error("Failed to delete task on server, keeping local only");
        }
      } catch (error) {
        console.error(
          "Error deleting task on server, keeping local only:",
          error
        );
      }
    }
  },

  // Move task to a new date group and sync with server or save locally
  moveTask: async (id, newDate) => {
    const { tasks, userId, isOnline } = get();
    console.log("moveTask called with:", { id, newDate, userId, isOnline });

    const taskToMove = tasks.find((t) => t.id === id);
    if (!taskToMove) {
      console.log("Task not found for moveTask:", id);
      return;
    }

    // Update local state immediately
    set((state) => {
      const tasksCopy = [...state.tasks];
      const taskToMove = tasksCopy.find((t) => t.id === id);
      if (!taskToMove) return {};

      const oldDate = taskToMove.date;
      const oldGroupIndex = taskToMove.groupIndex;

      // Get the last groupIndex in the new group
      const newGroup = tasksCopy.filter((t) => isSameGroup(t.date, newDate));
      const newGroupLength = newGroup.length;

      // Update the task's group and index
      taskToMove.date = newDate;
      taskToMove.groupIndex = newGroupLength;

      // Update groupIndex of other tasks in old group if needed
      tasksCopy.forEach((task) => {
        if (
          isSameGroup(task.date, oldDate) &&
          task.groupIndex > oldGroupIndex
        ) {
          task.groupIndex -= 1;
        }
      });
      return { tasks: tasksCopy };
    });

    // Save to local storage
    saveTasksToLocalStorage(get().tasks);

    if (isOnline && userId) {
      try {
        console.log("Sending moveTask request to server");
        const response = await fetch(API_URL_TASKS_UPDATE, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId: id,
            dueDate: newDate,
          }),
        });

        if (!response.ok) {
          console.error("Failed to move task on server, keeping local only");
        }
      } catch (error) {
        console.error(
          "Error moving task on server, keeping local only:",
          error
        );
      }
    }
  },

  // Update group index
  updateGroupIndex: (items) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        const updatedItem = items.find((item) => item.id === task.id);
        return updatedItem;
      });

      updatedTasks.forEach((t) => {
        const newTask = items.find((item) => item.id == t.id);
        t.groupIndex = newTask.groupIndex;
      });

      updatedTasks.sort((a, b) => a.groupIndex - b.groupIndex);

      // Save to local storage
      saveTasksToLocalStorage(updatedTasks);

      return { tasks: updatedTasks };
    });
  },

  // Clear tasks when logging out
  clearTasks: () => {
    set({ tasks: [], userId: null, isOnline: false });
    localStorage.removeItem(LOCAL_TASKS_KEY);
    localStorage.removeItem(LOCAL_USER_ID_KEY);
  },
}));

export default useTasksStore;

// Helper function to compare group membership by date
function isSameGroup(date1, date2) {
  if (!date1 && !date2) return true;
  if (!date1 || !date2) return false;
  return new Date(date1).toDateString() === new Date(date2).toDateString();
}
