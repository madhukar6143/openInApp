// task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize and connected to the database

const Task = sequelize.define('Task', {
  taskId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
    allowNull: false,
    defaultValue: 'TODO'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  callDaily: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// Define the association with User model
// Importing the User model
const SubTaskTask= require('./subTaskModel')
Task.hasMany(SubTaskTask, { foreignKey: 'taskId' }); 

module.exports = Task;
