// controllers/taskController.js
const Task = require('../models/taskModel');

// Controller function for adding a task
async function addTask(req, res) {
  try {
    const { title, description, status, dueDate, callDaily, userId } = req.body;
    
    // Check if userId is provided in the request body
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Create a new task with the provided data
    const newTask = await Task.create({
      title,
      description,
      status,
      dueDate,
      callDaily,
      userId
    });

    // Respond with the newly created task
   return res.status(201).json(newTask);
  } catch (error) {
   return  res.status(500).json({ error: error.message});
  }
}

// Controller function for deleting a task
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    await Task.destroy({ where: { taskId } });
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
   return  res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function for updating the status of a task
async function updateTaskStatus(req, res) {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    await Task.update({ status }, { where: { taskId } });
   return  res.status(200).json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error('Error updating task status:', error);
   return  res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { addTask, deleteTask, updateTaskStatus };
