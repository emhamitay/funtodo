/**
 * Task Routes (protected)
 *
 * Requires JWT via `authenticateTokenMiddleware`.
 * - GET    /getByUserId   List tasks for authenticated user
 * - POST   /create        Create a new task
 * - PUT    /update        Update an existing task
 * - DELETE /delete        Delete a task
 * - PUT    /toggleIsDone  Toggle completion
 * - PUT    /moveTask      Move task to a different date
 */
import { Router } from "express";
import tasksController from "../controllers/tasksController.js";
import authController from "../controllers/authController.js";

const router = Router();

router.use(authController.authenticateTokenMiddleware);

router.get("/getByUserId", (req, res) => {
  tasksController.GetTasksByUserId(req, res);
});
router.post("/create", (req, res) => {
  tasksController.CreateTask(req, res);
});
router.put("/update", (req, res) => {
  tasksController.UpdateTask(req, res);
});
router.delete("/delete", (req, res) => {
  tasksController.DeleteTask(req, res);
});
router.put("/toggleIsDone", (req, res) => {
  tasksController.ToggleIsDone(req, res);
});
router.put("/moveTask", (req, res) => {
  tasksController.MoveTask(req, res);
});

export default router;
