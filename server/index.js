/**
 * FunTodo Server
 *
 * Express application providing REST endpoints for authentication,
 * task management, and AI assistance. Uses Drizzle ORM with Postgres.
 *
 * Env vars:
 * - PORT: server port (default 3000)
 * - DATABASE_URL: Postgres connection string
 * - JWT_SECRET: secret for signing auth tokens
 * - OPENAI_API_KEY: for AI features
 */
import "dotenv/config";
import express from "express";
import cors from "cors";

import taskRoutes from "./routes/tasksRoute.js";
import openaiRoutes from "./routes/aiRoute.js";
import authRoutes from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FunTodo Server" });
});

app.use("/api/tasks/", taskRoutes);
app.use("/api/openai/", openaiRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
