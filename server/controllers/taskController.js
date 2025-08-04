const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  const { userId } = req.query; // Use query params for GET requests
  
  console.log('getTasks called with userId:', userId);
  
  if (!userId) {
    console.log('No userId provided');
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    console.log('Getting tasks for user:', userId);
    const tasks = await prisma.task.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' }
    });
    console.log('Found tasks:', tasks.length, 'tasks:', tasks);
    res.json({ tasks });
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { userId, title, description, dueDate, priority } = req.body;
  
  console.log('createTask called with:', { userId, title, description, dueDate, priority });
  
  if (!userId || !title) {
    console.log('Missing userId or title');
    return res.status(400).json({ error: 'User ID and title are required' });
  }

  try {
    console.log('Creating task for user:', userId);
    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'medium',
        userId: parseInt(userId)
      }
    });
    console.log('Task created successfully:', task);
    res.json({ task });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { taskId, title, description, completed, dueDate, priority } = req.body;
  
  console.log('updateTask called with:', { taskId, title, description, completed, dueDate, priority });
  
  if (!taskId) {
    console.log('No taskId provided');
    return res.status(400).json({ error: 'Task ID is required' });
  }

  try {
    console.log('Updating task:', taskId);
    const task = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        completed: completed !== undefined ? completed : undefined,
        dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : undefined,
        priority: priority !== undefined ? priority : undefined
      }
    });
    console.log('Task updated successfully:', task);
    res.json({ task });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.body;
  
  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  try {
    console.log('Deleting task:', taskId);
    await prisma.task.delete({
      where: { id: parseInt(taskId) }
    });
    console.log('Task deleted:', taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Toggle task completion
exports.toggleTask = async (req, res) => {
  const { taskId } = req.body;
  
  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  try {
    console.log('Toggling task:', taskId);
    const currentTask = await prisma.task.findUnique({
      where: { id: parseInt(taskId) }
    });
    
    if (!currentTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: { completed: !currentTask.completed }
    });
    console.log('Task toggled:', task.id, 'completed:', task.completed);
    res.json({ task });
  } catch (err) {
    console.error('Error toggling task:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
}; 