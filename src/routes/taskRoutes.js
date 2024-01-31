// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { checkAuthorize } = require('../config/authMiddleware');

// Route for adding a task
router.post('/add',checkAuthorize, taskController.addTask);

// Route for deleting a task
router.delete('/:taskId',checkAuthorize, taskController.deleteTask);

// Route for updating the status of a task
router.put('/:taskId/status',checkAuthorize, taskController.updateTaskStatus);

module.exports = router;
