const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.register = async (req, res) => {
  console.log('Register endpoint called');
  console.log('Request body:', req.body);
  
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    console.log('Invalid email format:', email);
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password length
  if (password.length < 6) {
    console.log('Password too short');
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    console.log('Checking if user exists...');
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log('User already exists');
      return res.status(400).json({ error: 'User already exists' });
    }
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Creating user...');
    const user = await prisma.user.create({ data: { email, password: hashedPassword } });
    console.log('User created successfully');
    res.json({ message: 'Registration successful', userId: user.id.toString() });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

exports.login = async (req, res) => {
  console.log('Login endpoint called');
  console.log('Request body:', req.body);
  
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    console.log('Invalid email format:', email);
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    console.log('Finding user...');
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    console.log('Checking password...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    console.log('Login successful');
    res.json({ message: 'Login successful', userId: user.id.toString() });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};