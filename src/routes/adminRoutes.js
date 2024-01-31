// routes/subTaskRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const cron = require('node-cron');

// Route for adding a subtask to a main task
router.get('/check', adminController.taskCheck);

cron.schedule('0 9 * * *', async () => {
    console.log('Running taskCheck at 9:00 AM');
    await adminController.taskCheck();
  });
  
  // Schedule cronJob to run every day at 9:30 AM (adjust time as needed)
  cron.schedule('30 9 * * *', async () => {
    console.log('Running cronJob at 9:30 AM');
    await adminController.cronJob;
  });


module.exports = router;
