const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());

// Mount all routes
app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;