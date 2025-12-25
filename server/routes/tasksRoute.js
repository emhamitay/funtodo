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
router.post("/toggleIsDone", (req, res) => {
  tasksController.ToggleIsDone(req, res);
});

export default router;
