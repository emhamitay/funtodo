// db/client.js
import postgres from "postgres"; // Client for Postgres
import { drizzle } from "drizzle-orm/postgres-js"; // Drizzle ORM for Postgres

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set. Configure your cloud DB URL.");
}

// For cloud providers (Neon, Supabase, etc.), require SSL at the client level.
// This aligns with URLs using `?sslmode=require` and avoids TLS negotiation issues.
const client = postgres(DATABASE_URL, {
  ssl: "require",
});

// Create Drizzle ORM instance
export const db = drizzle(client);
