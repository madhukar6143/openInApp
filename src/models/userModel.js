// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Assuming you have configured Sequelize and connected to the database

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isPhoneNumber(value) {
        // Validate phone number format
        if (!/^\d{10}$/.test(value)) {
          throw new Error('Phone number must be 10 digits long');
        }
        // Validate phone number doesn't start with 0
        if (value.charAt(0) === '0') {
          throw new Error('Phone number cannot start with 0');
        }
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Assuming default priority is 0
  }
});

const Task= require('./taskModel')
User.hasMany(Task, { foreignKey: 'userId' }); // Define the association

module.exports = User;
