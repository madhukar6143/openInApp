// controllers/subTaskController.js
// Import the necessary models
const Task = require('../models/taskModel');
const SubTask = require('../models/subTaskModel');
const { Op } = require('sequelize');

// Controller function for adding a subtask to a main task
async function addSubTask(req, res) {
  try {
    const { taskId } = req.params;
    const { description ,status} = req.body;
    const newSubTask = await SubTask.create({ description,status,taskId });
    res.status(201).json(newSubTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Controller function for updating the status of a subtask


async function updateSubTaskStatus(req, res) {
  try {
    console.log("here")
    const { subTaskId,status } = req.body;

    console.log("here")
    // Update the SubTask status
    await SubTask.update({ status }, { where: { subTaskId } });

    // Call a function to check and update task status
    await updateTaskStatus(subTaskId);

    res.status(200).json({ message: 'Subtask status updated successfully' });
  } catch (error) {
    console.error('Error updating subtask status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateTaskStatus(subTaskId) {
  try {
    // Get the task associated with the updated subtask
    const subTask = await SubTask.findByPk(subTaskId);
    const taskId = subTask.taskId;

    // Check if all subtasks of the task are completed
    const taskSubTasks = await SubTask.findAll({ where: { taskId } });
    const allCompleted = taskSubTasks.every(subtask => subtask.status);

    // Update the task status based on subtask completion
    if (allCompleted) {
      await Task.update({ status: 'DONE' }, { where: { taskId } });
    } else {
      await Task.update({ status: 'IN_PROGRESS' }, { where: { taskId } });
    }
  } catch (error) {
    console.error('Error updating task status:', error);
  }
}


module.exports = { addSubTask, updateSubTaskStatus };
