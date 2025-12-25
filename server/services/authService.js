import { db } from "../db/client.js";
import { users } from "../db/schema/user.js";
import { eq } from "drizzle-orm";

const authService = {
  Reset: async (onSuccess, onFail) => {
    try {
      await db.delete(users);
      console.log("All users have been reset by admin.");
      onSuccess();
    } catch (error) {
      console.error("Reset error:", error);
      onFail();
    }
  },
  Create: async (username, passwordJash) => {
    const inserted = await db
      .insert(users)
      .values({
        username: username,
        passwordHash: passwordJash,
      })
      .returning({ id: users.id });
    return inserted[0]?.id;
  },
  isUsernameExists: async (username) => {
    let existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return existingUser.length > 0 ? true : false;
  },
  getUserByUsername: async (username) => {
    try {
      console.log("Checking existence of user:", username);
      // Search for user in database by username
      const user = (
        await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1)
      )[0];

      console.log("Fetched user:", user);

      return user;
    } catch {
      console.log("failed checking if the user exist");
    }
  },
};
export default authService;
