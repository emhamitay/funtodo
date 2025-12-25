const tasksController = {
  GetTasksByUserId: async (req, res) => {
    req.quer;
  },
  CreateTask: async (req, res) => {
    //get values
    const { title, description, date, isDone, userId } = req.body;

    //validate that the values match
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
  },
  UpdateTask: async (req, res) => {
    // Logic to update a task
  },
  DeleteTask: async (req, res) => {
    // Logic to delete a task
  },
  ToggleIsDone: async (req, res) => {
    // Logic to toggle task completion status
  },
};
export default tasksController;
