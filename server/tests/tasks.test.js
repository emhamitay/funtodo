const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
  let userId;
  let taskId;
  const testEmail = 'taskuser@example.com';
  const testPassword = 'test123456';

  beforeAll(async () => {
    // Create user for testing
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });
    
    if (res.statusCode === 200) {
      userId = res.body.userId;
    } else {
      // If user already exists, try to login to get userId
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: testEmail, password: testPassword });
      
      if (loginRes.statusCode === 200) {
        userId = loginRes.body.userId;
      } else {
        // If login fails, create a new user with a unique email
        const uniqueEmail = `taskuser${Date.now()}@example.com`;
        const newUserRes = await request(app)
          .post('/api/auth/register')
          .send({ email: uniqueEmail, password: testPassword });
        userId = newUserRes.body.userId;
      }
    }
  });

  describe('Task Creation', () => {
    it('should create a new task with all fields', async () => {
      const taskData = {
        userId,
        title: 'Test Task',
        description: 'Test description',
        dueDate: new Date().toISOString(),
        priority: 'high'
      };
      const res = await request(app)
        .post('/api/tasks/create')
        .send(taskData);
      expect(res.statusCode).toBe(200);
      expect(res.body.task).toHaveProperty('id');
      expect(res.body.task.title).toBe(taskData.title);
      expect(res.body.task.description).toBe(taskData.description);
      taskId = res.body.task.id;
    });

    it('should create a task with minimal fields', async () => {
      const res = await request(app)
        .post('/api/tasks/create')
        .send({ userId, title: 'Minimal Task' });
      expect(res.statusCode).toBe(200);
      expect(res.body.task).toHaveProperty('id');
      expect(res.body.task.title).toBe('Minimal Task');
    });

    it('should not create task without userId', async () => {
      const res = await request(app)
        .post('/api/tasks/create')
        .send({ title: 'Test Task' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not create task without title', async () => {
      const res = await request(app)
        .post('/api/tasks/create')
        .send({ userId });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not create task with invalid userId', async () => {
      const res = await request(app)
        .post('/api/tasks/create')
        .send({ userId: 'invalid-id', title: 'Test Task' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Task Retrieval', () => {
    it('should get all tasks for user', async () => {
      const res = await request(app)
        .get(`/api/tasks/get?userId=${userId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.tasks)).toBe(true);
      expect(res.body.tasks.length).toBeGreaterThan(0);
    });

    it('should return empty array for user with no tasks', async () => {
      const newUserRes = await request(app)
        .post('/api/auth/register')
        .send({ email: `newuser${Date.now()}@example.com`, password: testPassword });
      const newUserId = newUserRes.body.userId || '999';
      
      const res = await request(app)
        .get(`/api/tasks/get?userId=${newUserId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.tasks)).toBe(true);
      expect(res.body.tasks.length).toBe(0);
    });

    it('should not get tasks without userId', async () => {
      const res = await request(app)
        .get('/api/tasks/get');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not get tasks with invalid userId', async () => {
      const res = await request(app)
        .get('/api/tasks/get?userId=invalid-id');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Task Updates', () => {
    it('should update task title', async () => {
      const res = await request(app)
        .put('/api/tasks/update')
        .send({ taskId, title: 'Updated Task Title' });
      expect(res.statusCode).toBe(200);
      expect(res.body.task.title).toBe('Updated Task Title');
    });

    it('should update task description', async () => {
      const res = await request(app)
        .put('/api/tasks/update')
        .send({ taskId, description: 'Updated description' });
      expect(res.statusCode).toBe(200);
      expect(res.body.task.description).toBe('Updated description');
    });

    it('should update task due date', async () => {
      const newDate = new Date().toISOString();
      const res = await request(app)
        .put('/api/tasks/update')
        .send({ taskId, dueDate: newDate });
      expect(res.statusCode).toBe(200);
      expect(res.body.task.dueDate).toBe(newDate);
    });

    it('should not update non-existent task', async () => {
      const res = await request(app)
        .put('/api/tasks/update')
        .send({ taskId: '999999', title: 'Updated' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Task Completion', () => {
    it('should toggle task completion status', async () => {
      // First toggle to complete
      const res1 = await request(app)
        .put('/api/tasks/toggle')
        .send({ taskId });
      expect(res1.statusCode).toBe(200);
      expect(res1.body.task.completed).toBe(true);

      // Then toggle back to incomplete
      const res2 = await request(app)
        .put('/api/tasks/toggle')
        .send({ taskId });
      expect(res2.statusCode).toBe(200);
      expect(res2.body.task.completed).toBe(false);
    });

    it('should not toggle non-existent task', async () => {
      const res = await request(app)
        .put('/api/tasks/toggle')
        .send({ taskId: '999999' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Task Deletion', () => {
    it('should delete a task', async () => {
      const res = await request(app)
        .delete('/api/tasks/delete')
        .send({ taskId });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Task deleted successfully');
    });

    it('should not delete non-existent task', async () => {
      const res = await request(app)
        .delete('/api/tasks/delete')
        .send({ taskId: '999999' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});