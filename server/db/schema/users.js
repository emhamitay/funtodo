import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

// Define User table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // Primary key column
  username: varchar("username", { length: 50 }).notNull(), // Username column
  passwordHash: varchar("password_hash", { length: 255 }).notNull(), // Password hash column
  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation timestamp column
});
