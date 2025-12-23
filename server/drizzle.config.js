/*
export default {
  schema: "./src/db/schema/*.js",
  out: "./drizzle",
  driver: "pg",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
*/

// drizzle.config.js
import "dotenv/config"; // מאפשר טעינת משתני סביבה מה־.env
import { join } from "path";

/** @type {import('drizzle-kit').Config} */
export default {
  schema: "./db/schema/**/*.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
