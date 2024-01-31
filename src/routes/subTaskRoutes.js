// routes/subTaskRoutes.js
const express = require('express');
const router = express.Router();
const subTaskController = require('../controllers/subTaskController');
const { checkAuthorize } = require('../config/authMiddleware');

// Route for adding a subtask to a main task
router.post('/:taskId',checkAuthorize, subTaskController.addSubTask);


// Route for updating the status of a subtask
router.put('/update',checkAuthorize, subTaskController.updateSubTaskStatus);

module.exports = router;
