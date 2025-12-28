import { pgTable, serial, varchar, date, boolean } from "drizzle-orm/pg-core";

// Define User table schema
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(), // Primary key column
  title: varchar("title", { length: 50 }).notNull(), // Title column
  description: varchar("description", { length: 255 }).notNull(), // Description column
  date: date("date"), // date column
  isDone: boolean("is_done").default(false).notNull(), // Completion status column
  userId: serial("user_id").notNull(), // Foreign key to users table
});
