import { db } from "../db/client.js";
import { users } from "../db/schema/users.js";
import { tasks } from "../db/schema/tasks.js";
import { eq } from "drizzle-orm";

const authService = {
  /**
   * Admin-only: delete all users and tasks
   */
  Reset: async () => {
    try {
      await db.delete(users);
      await db.delete(tasks);
      console.log("All users and tasks have been reset by admin.");
    } catch (error) {
      console.error("Reset error:", error);
      throw error;
    }
  },

  /**
   * Create new user
   */
  Create: async (username, passwordHash) => {
    try {
      const inserted = await db
        .insert(users)
        .values({ username, passwordHash })
        .returning({ id: users.id });
      return inserted[0]?.id ?? null;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Check if username exists
   */
  isUsernameExists: async (username) => {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return existingUser.length > 0;
  },

  /**
   * Get user by username
   */
  getUserByUsername: async (username) => {
    try {
      const user = (
        await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1)
      )[0];
      return user || null;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  },
};

export default authService;
