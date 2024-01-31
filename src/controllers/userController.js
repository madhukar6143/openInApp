// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Task = require('../models/taskModel')
const SubTask = require('../models/subTaskModel')

// Controller function for user registration
async function registerUser(req, res) {
  try {
    const { phone, password, priority } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });
    // Check password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const newUser = await User.create({ phone, password: hashedPassword, priority });
    res.status(201).json({ user: newUser });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Extract validation errors from the Sequelize error
      const validationErrors = error.errors.map((error) => ({
        field: error.path,
        message: error.message,
      }));

      return res.status(400).json({ errors: validationErrors });
    }

    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function for user login
async function loginUser(req, res) {
  try {
    const { phone, password } = req.body;
    // Find user by phone number
    const user = await User.findOne({ where: { phone } });
    if (!user)
      return res.status(404).json({ message: 'User not found' });
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Invalid password' });
    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, 'abcdef', { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function allTasks(req, res) {
  try {
    const { userId } = req.params;
    // Find the user by userId
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Task,
          include: [{ model: SubTask }] // Include subtasks of each task
        }
      ]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Return user's tasks and subtasks
    res.json(user.Tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerUser, loginUser, allTasks };
