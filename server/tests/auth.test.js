const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  let testEmail;
  const testPassword = 'test123456';
  const invalidEmail = 'invalid-email';
  const shortPassword = '123';

  // Setup: Create a unique test user for this test run
  beforeAll(async () => {
    testEmail = `testuser${Date.now()}@example.com`;
    
    // Create the test user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });
    
    // If registration fails (user already exists), that's fine
    // The user will be available for login tests
  });

  describe('Registration', () => {
    it('should register a new user with valid credentials', async () => {
      const uniqueEmail = `testuser${Date.now()}@example.com`;
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: uniqueEmail, password: testPassword });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('userId');
      expect(typeof res.body.userId).toBe('string');
    });

    it('should not register with invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: invalidEmail, password: testPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not register with short password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'shortpass@example.com', password: shortPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not register with missing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: testPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not register with missing password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: testEmail });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not register the same user twice', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: testEmail, password: testPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Login', () => {
    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testEmail, password: testPassword });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('userId');
      expect(typeof res.body.userId).toBe('string');
    });

    it('should not login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testEmail, password: 'wrongpass' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: testPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not login with invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: invalidEmail, password: testPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not login with missing email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: testPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not login with missing password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testEmail });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});