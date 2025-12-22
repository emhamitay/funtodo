import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from "./routes/tasksRoute.js";
import openaiRoutes from "./routes/aiRoute.js";

dotenv.config();

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

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
