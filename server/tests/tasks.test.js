const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
  let userId;
  let taskId;
  const testEmail = 'taskuser@example.com';
  const testPassword = 'test123';

  beforeAll(async () => {
    // צור משתמש לבדיקה
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });
    userId = res.body.userId;
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks/create')
      .send({ userId, title: 'Test Task', description: 'desc' });
    expect(res.statusCode).toBe(200);
    expect(res.body.task).toHaveProperty('id');
    taskId = res.body.task.id;
  });

  it('should get all tasks for user', async () => {
    const res = await request(app)
      .get(`/api/tasks/get?userId=${userId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body.tasks.length).toBeGreaterThan(0);
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put('/api/tasks/update')
      .send({ taskId, title: 'Updated Task' });
    expect(res.statusCode).toBe(200);
    expect(res.body.task.title).toBe('Updated Task');
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete('/api/tasks/delete')
      .send({ taskId });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully');
  });
});