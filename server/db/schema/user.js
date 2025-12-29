import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

/**
 * Drizzle Schema: users (duplicate)
 * Note: This file mirrors `schema/users.js`. Prefer a single definition.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
