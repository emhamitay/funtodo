const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  const testEmail = 'testuser@example.com';
  const testPassword = 'test123';

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('userId');
  });

  it('should not register the same user twice', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('userId');
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'wrongpass' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});