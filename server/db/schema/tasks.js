import { pgTable, serial, varchar, date, boolean } from "drizzle-orm/pg-core";

/**
 * Drizzle Schema: tasks
 */
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  date: date("date"),
  isDone: boolean("is_done").default(false).notNull(),
  userId: serial("user_id").notNull(),
});
