import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

/**
 * Drizzle Schema: users
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
