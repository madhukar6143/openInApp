// config/sequelize.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('openinapp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false // Disable createdAt and updatedAt columns
  }
});

module.exports = sequelize;
 