// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const subTaskRoutes = require('./src/routes/subTaskRoutes');
const adminRoutes =require('./src/routes/adminRoutes')
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/subtasks', subTaskRoutes);
app.use("/admin",adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
