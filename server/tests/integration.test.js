const request = require('supertest');
const app = require('../app');

describe('Integration Tests', () => {
  let userId;
  let taskId;
  const testEmail = 'integration@example.com';
  const testPassword = 'test123456';

  describe('Full User Workflow', () => {
    it('should complete full user workflow: register -> login -> create task -> update -> delete', async () => {
      // Step 1: Register user with unique email
      const uniqueEmail = `workflow${Date.now()}@example.com`;
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({ email: uniqueEmail, password: testPassword });
      
      expect(registerRes.statusCode).toBe(200);
      userId = registerRes.body.userId;

      // Step 2: Login user
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: uniqueEmail, password: testPassword });
      
      expect(loginRes.statusCode).toBe(200);
      expect(loginRes.body.userId).toBe(userId);

      // Step 3: Create task
      const createRes = await request(app)
        .post('/api/tasks/create')
        .send({ 
          userId, 
          title: 'Workflow Task', 
          description: 'Test task for workflow',
          dueDate: new Date().toISOString(),
          priority: 'high'
        });
      
      expect(createRes.statusCode).toBe(200);
      taskId = createRes.body.task.id;

      // Step 4: Get tasks
      const getRes = await request(app)
        .get(`/api/tasks/get?userId=${userId}`);
      
      expect(getRes.statusCode).toBe(200);
      expect(getRes.body.tasks).toHaveLength(1);
      expect(getRes.body.tasks[0].title).toBe('Workflow Task');

      // Step 5: Update task
      const updateRes = await request(app)
        .put('/api/tasks/update')
        .send({ 
          taskId, 
          title: 'Updated Workflow Task',
          description: 'Updated description'
        });
      
      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.task.title).toBe('Updated Workflow Task');

      // Step 6: Toggle task completion
      const toggleRes = await request(app)
        .put('/api/tasks/toggle')
        .send({ taskId });
      
      expect(toggleRes.statusCode).toBe(200);
      expect(toggleRes.body.task.completed).toBe(true);

      // Step 7: Delete task
      const deleteRes = await request(app)
        .delete('/api/tasks/delete')
        .send({ taskId });
      
      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.body.message).toBe('Task deleted successfully');

      // Step 8: Verify task is deleted
      const finalGetRes = await request(app)
        .get(`/api/tasks/get?userId=${userId}`);
      
      expect(finalGetRes.statusCode).toBe(200);
      expect(finalGetRes.body.tasks).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid JSON in request body', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .set('Content-Type', 'application/json')
        .send('invalid json');
      
      expect(res.statusCode).toBe(400);
    });

    it('should handle missing required fields gracefully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' }); // Missing password
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should handle invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'invalid-email', password: testPassword });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should handle short password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'shortpass@example.com', password: '123' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Concurrent Operations', () => {
    it('should handle multiple simultaneous task creations', async () => {
      // Create a user for testing
      const uniqueEmail = `concurrent${Date.now()}@example.com`;
      const userRes = await request(app)
        .post('/api/auth/register')
        .send({ email: uniqueEmail, password: testPassword });
      
      const testUserId = userRes.body.userId;

      // Create multiple tasks simultaneously
      const taskPromises = [
        request(app)
          .post('/api/tasks/create')
          .send({ userId: testUserId, title: 'Task 1' }),
        request(app)
          .post('/api/tasks/create')
          .send({ userId: testUserId, title: 'Task 2' }),
        request(app)
          .post('/api/tasks/create')
          .send({ userId: testUserId, title: 'Task 3' })
      ];

      const results = await Promise.all(taskPromises);

      results.forEach(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body.task).toHaveProperty('id');
      });

      // Verify all tasks were created
      const getRes = await request(app)
        .get(`/api/tasks/get?userId=${testUserId}`);
      
      expect(getRes.statusCode).toBe(200);
      expect(getRes.body.tasks).toHaveLength(3);
    });
  });
}); 