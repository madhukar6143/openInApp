// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAuthorize } = require('../config/authMiddleware');


// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);


router.get('/:userId', checkAuthorize , userController.allTasks)

module.exports = router;
