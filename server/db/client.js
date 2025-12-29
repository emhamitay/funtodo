/**
 * Drizzle + Postgres Client
 *
 * Connects to Postgres using `DATABASE_URL` and exposes a Drizzle
 * ORM instance for queries and mutations.
 */
import postgres from "postgres"; // Client for Postgres
import { drizzle } from "drizzle-orm/postgres-js"; // Drizzle ORM for Postgres

// Initialize Postgres client
const client = postgres(process.env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false },
});

// Create Drizzle ORM instance
export const db = drizzle(client);
