import { db } from "../db/client.js";
import { tasks } from "../db/schema/tasks.js";
import { eq } from "drizzle-orm";

const tasksService = {
  /**
   * Create new task
   */
  createTask: async (taskData) => {
    try {
      const inserted = await db
        .insert(tasks)
        .values(taskData)
        .returning({ id: tasks.id });
      return inserted[0]?.id ?? null;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  /**
   * Get task by ID
   */
  getTaskByTaskId: async (taskId) => {
    try {
      const row = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id, taskId))
        .limit(1);
      return row[0] || null;
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      throw error;
    }
  },

  /**
   * Get task by ID and ensure it belongs to the given user
   * @param {number} taskId
   * @param {number} userId
   * @returns {Object|null} task or null if not found / unauthorized
   */
  getTaskIfOwnedByUser: async (taskId, userId) => {
    const task = await tasksService.getTaskByTaskId(taskId);
    if (!task || task.userId !== userId) return null;
    return task;
  },

  /**
   * Get all tasks for a user
   */
  getTasksByUserId: async (userId) => {
    try {
      return await db.select().from(tasks).where(eq(tasks.userId, userId));
    } catch (error) {
      console.error("Error fetching tasks for user:", error);
      throw error;
    }
  },

  /**
   * Update task with validation
   */
  updateTask: async (taskId, updateData) => {
    const allowed = {
      title: "string",
      description: "string",
      // Accept either Date object or ISO/date string; drizzle can handle dates
      date: ["object", "string"],
      isDone: "boolean",
    };

    // Build payload with only valid fields from updateData
    const payload = Object.fromEntries(
      Object.entries(updateData)
        .filter(([key, value]) => {
          // Only consider keys listed in allowed
          const rule = allowed[key];
          if (!rule) return false;
          if (value === undefined) return false;
          if (value === null) return true;
          // Rule can be a single type string or an array of type strings
          const types = Array.isArray(rule) ? rule : [rule];
          return types.includes(typeof value);
        })
        .map(([key, value]) => [key, value])
    );

    if (updateData.title === "") {
      throw new Error("Title cannot be empty");
    }

    if (!Object.keys(payload).length) {
      throw new Error("No valid fields to update");
    }

    try {
      const updated = await db
        .update(tasks)
        .set(payload)
        .where(eq(tasks.id, taskId))
        .returning({ id: tasks.id });

      return updated[0]?.id ?? null;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  /**
   * Delete task by ID
   */
  deleteTask: async (taskId) => {
    try {
      await db.delete(tasks).where(eq(tasks.id, taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },

  /**
   * Toggle task completion
   */
  toggleIsDone: async (taskId) => {
    try {
      const task = await tasksService.getTaskByTaskId(taskId);
      if (!task) return null;

      const updated = await db
        .update(tasks)
        .set({ isDone: !task.isDone })
        .where(eq(tasks.id, taskId))
        .returning({ id: tasks.id });

      return updated[0]?.id ?? null;
    } catch (error) {
      console.error("Error toggling isDone:", error);
      throw error;
    }
  },

  /**
   * Move task to a new date (can be null to clear the date)
   */
  moveTask: async (taskId, newDate) => {
    try {
      console.log("Moving task:", taskId, "to date:", newDate);
      const task = await tasksService.getTaskByTaskId(taskId);
      if (!task) return null;

      const updated = await db
        .update(tasks)
        .set({ date: newDate })
        .where(eq(tasks.id, taskId))
        .returning({ id: tasks.id });

      return updated[0]?.id ?? null;
      console.log("Task moved successfully:", updatedId);
    } catch (error) {
      console.log("Move task error:", error);
      console.error("Error moving task:", error);
      throw error;
    }
  },
};

export default tasksService;
