const express = require('express');
const router = express.Router();
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTask 
} = require('../controllers/taskController');

router.get('/get', getTasks);
router.post('/create', createTask);
router.put('/update', updateTask);
router.delete('/delete', deleteTask);
router.put('/toggle', toggleTask);

module.exports = router; 