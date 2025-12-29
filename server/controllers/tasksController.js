/**
 * Tasks Controller
 *
 * Handles request validation and orchestration between HTTP layer and
 * `tasksService`. Assumes `req.userId` is set by auth middleware.
 */
import tasksService from "../services/tasksService.js";

const tasksController = {
  /**
   * GET /getByUserId
   * Return tasks for the authenticated user.
   */
  GetTasksByUserId: async (req, res) => {
    try {
      const tasks = await tasksService.getTasksByUserId(req.userId);
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ error: "Failed to get tasks" });
    }
  },

  /**
   * POST /create
   * Create a new task for the authenticated user.
   */
  CreateTask: async (req, res) => {
    console.log("CreateTask request body:", req.body);
    const { title, description, date, isDone } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = {
      userId: req.userId,
      title,
      description: description || "",
      date: date || null,
      isDone: isDone ?? false,
    };

    try {
      console.log("Creating task:", newTask);
      const taskId = await tasksService.createTask(newTask);
      res.status(201).json({ message: "Task created successfully", taskId });
    } catch (error) {
      console.log("Create task error:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  },

  /**
   * PUT /update
   * Update task fields (title/description/date/isDone).
   */
  UpdateTask: async (req, res) => {
    const { id, title, description, date, isDone } = req.body;
    console.log("UpdateTask request body:", req.body);
    if (!title) return res.status(400).json({ error: "Title is required" });

    try {
      const task = await tasksService.getTaskIfOwnedByUser(id, req.userId);
      if (!task) return res.status(403).json({ error: "Unauthorized" });
      console.log("Updating task:", { id, title, description, date, isDone });
      const updatedId = await tasksService.updateTask(id, {
        title,
        description,
        date,
        isDone,
      });
      res
        .status(200)
        .json({ message: "Task updated successfully", taskId: updatedId });
      console.log("Task updated successfully:", updatedId);
    } catch (error) {
      console.log("Update task error:", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  },

  /**
   * DELETE /delete
   * Delete a task owned by the authenticated user.
   */
  DeleteTask: async (req, res) => {
    const { id } = req.body;
    try {
      const task = await tasksService.getTaskIfOwnedByUser(id, req.userId);
      if (!task) return res.status(403).json({ error: "Unauthorized" });

      await tasksService.deleteTask(id);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  },

  /**
   * PUT /toggleIsDone
   * Toggle completion for a task.
   */
  ToggleIsDone: async (req, res) => {
    const { id } = req.body;
    try {
      const task = await tasksService.getTaskIfOwnedByUser(id, req.userId);
      if (!task) return res.status(403).json({ error: "Unauthorized" });

      const updatedId = await tasksService.toggleIsDone(id);
      res
        .status(200)
        .json({ message: "Task toggled successfully", taskId: updatedId });

      console.log("Task toggled successfully:", updatedId);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle task" });
    }
  },

  /**
   * PUT /moveTask
   * Move a task to a new date (or clear date with null).
   */
  MoveTask: async (req, res) => {
    const { id, date } = req.body;
    try {
      const task = await tasksService.getTaskIfOwnedByUser(id, req.userId);
      if (!task) return res.status(403).json({ error: "Unauthorized" });

      const updatedId = await tasksService.moveTask(id, date);
      res
        .status(200)
        .json({ message: "Task moved successfully", taskId: updatedId });

      console.log("Task moved successfully:", updatedId);
    } catch (error) {
      console.log("Move task error:", error);
      res.status(500).json({ error: "Failed to move task" });
    }
  },
};

export default tasksController;
