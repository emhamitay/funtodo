import { create } from "zustand";
import { mTask } from "@/models/mTask";

// Zustand store for managing task list with server synchronization
const useTasksStore = create((set, get) => ({
  tasks: [],
  userId: null,
  isLoading: false,

  // Set user ID when logged in
  setUserId: (userId) => {
    set({ userId });
  },

  // Load tasks from server
  loadTasks: async (userId) => {
    console.log('loadTasks called with userId:', userId);
    
    if (!userId) {
      console.log('No userId provided to loadTasks');
      return;
    }
    
    set({ isLoading: true });
    try {
      console.log('Sending loadTasks request to server');
      const response = await fetch(`/api/tasks/get?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('loadTasks server response:', data);
        const tasks = data.tasks.map(task => mTask.fromServerData(task));
        console.log('Parsed tasks:', tasks);
        set({ tasks, userId });
        console.log('Tasks loaded successfully in store');
      } else {
        console.error('Failed to load tasks');
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Create a new task and sync with server
  createTask: async (task) => {
    const { tasks, userId } = get();
    console.log('createTask called with:', { task, userId });
    
    if (!userId) {
      console.log('No userId available for createTask');
      return;
    }

    try {
      console.log('Sending createTask request to server');
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title: task.name,
          description: task.description,
          dueDate: task.date,
          priority: 'medium'
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('createTask server response:', data);
        const newTask = mTask.fromServerData(data.task);
        
        const relevantGroup = tasks.filter((t) => isSameGroup(t.date, task.date));
        newTask.groupIndex = relevantGroup.length;
        
        set({ tasks: [...tasks, newTask] });
        console.log('Task created successfully in store');
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  },

  // Edit name/description of a task by index and sync with server
  editTask: async (updatedTask) => {
    const { tasks, userId } = get();
    if (!userId) return;

    try {
      const response = await fetch('/api/tasks/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: updatedTask.id,
          title: updatedTask.name,
          description: updatedTask.description
        })
      });

      if (response.ok) {
        set((state) => {
          const updatedTasks = state.tasks.map((task) => {
            if (task.id === updatedTask.id) {
              task.name = updatedTask.name;
              task.description = updatedTask.description;
            }
            return task;
          });
          return { tasks: updatedTasks };
        });
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  // Toggle task completion status and sync with server
  updateIsDone: async (task, value) => {
    const { userId } = get();
    if (!userId) return;

    try {
      const response = await fetch('/api/tasks/toggle', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id })
      });

      if (response.ok) {
        set((state) => {
          const updatedTasks = [...state.tasks];
          updatedTasks.find((t) => t.id == task.id).isdone = value;
          return { tasks: updatedTasks };
        });
      } else {
        console.error('Failed to toggle task');
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  },

  // Remove task by index and sync with server
  removeTask: async (taskToRemove) => {
    const { userId } = get();
    if (!userId) return;

    try {
      const response = await fetch('/api/tasks/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: taskToRemove.id })
      });

      if (response.ok) {
        set((state) => {
          const tasksCopy = [...state.tasks];
          const index = tasksCopy.findIndex((t) => t.id === taskToRemove.id);

          if (index !== -1) {
            tasksCopy.splice(index, 1);
          }

          return { tasks: tasksCopy };
        });
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },

  // Move task to a new date group and sync with server
  moveTask: async (id, newDate) => {
    const { tasks, userId } = get();
    console.log('moveTask called with:', { id, newDate, userId });
    
    if (!userId) {
      console.log('No userId available for moveTask');
      return;
    }

    const taskToMove = tasks.find((t) => t.id === id);
    if (!taskToMove) {
      console.log('Task not found for moveTask:', id);
      return;
    }

    try {
      console.log('Sending moveTask request to server');
      const response = await fetch('/api/tasks/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: id,
          dueDate: newDate
        })
      });

      if (response.ok) {
        console.log('moveTask server response successful');
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
      } else {
        console.error('Failed to move task');
      }
    } catch (error) {
      console.error('Error moving task:', error);
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
      return { tasks: updatedTasks };
    });
  },

  // Clear tasks when logging out
  clearTasks: () => {
    set({ tasks: [], userId: null });
  },
}));

export default useTasksStore;

// Helper function to compare group membership by date
function isSameGroup(date1, date2) {
  if (!date1 && !date2) return true;
  if (!date1 || !date2) return false;
  return new Date(date1).toDateString() === new Date(date2).toDateString();
}
