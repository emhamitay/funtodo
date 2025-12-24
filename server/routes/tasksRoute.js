import { Router } from "express";
const router = Router();

router.get("/getByUserId", (req, res) => {
  //query param userId
  const { userId } = req.query;

  // Logic to get tasks by user ID
  res.json({ success: true, data: [] });
});
router.post("/create", (req, res) => {
  const { userId, title, description, isDone } = req.body;
  // Logic to create a new task
  res.json({ success: true, data: { taskId: "newTaskId" } });
});
router.put("/update", (req, res) => {
  const { taskId, title, description } = req.body;
  // Logic to update a task
  res.json({ success: true });
});
router.delete("/delete", (req, res) => {
  const { taskId } = req.body;
  // Logic to delete a task
  res.json({ success: true });
});
router.post("/toggleIsDone", (req, res) => {
  const { taskId, isDone } = req.body;
  // Logic to toggle task completion status
  res.json({ success: true });
});

export default router;
