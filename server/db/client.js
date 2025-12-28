// db/client.js
import postgres from "postgres"; // Client for Postgres
import { drizzle } from "drizzle-orm/postgres-js"; // Drizzle ORM for Postgres

// Initialize Postgres client
const client = postgres(process.env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false },
});

// Create Drizzle ORM instance
export const db = drizzle(client);
