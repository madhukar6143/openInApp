// subtask.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize and connected to the database

const SubTask = sequelize.define('SubTask', {
  subTaskId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});


module.exports = SubTask;
