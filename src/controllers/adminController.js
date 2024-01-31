// Import the necessary models
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const twilio = require('twilio');
const accountSid = 'ACb57aa5ecb4d081a056ce6494e7c1712f';
const authToken = 'f2dde8426faba2433c45ce52768318c2';
const client = new twilio(accountSid, authToken);


async function taskCheck(req, res) {
  try {
    // Fetch all users with their tasks
    const users = await User.findAll({
      include: [{
        model: Task
      }]
    });

    // Iterate through each user
    for (const user of users) {
      // Determine the priority based on the due dates of their tasks
      let priority = 0;
      for (const task of user.Tasks) { // Corrected to user.Tasks

        if (task.status === 'DONE') {
            continue;
          }
         
          const dueDate = new Date(task.dueDate);
          const today = new Date();
          const diffInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
          if (diffInDays <= 0) {
            priority = 0; // Due today
            break;
          } else if (diffInDays <= 1) {
            priority = 1; // Due tomorrow
          } else if (diffInDays <= 2) {
            priority = 1; // Due day after tomorrow
          } else if (diffInDays <= 4) {
            priority = 2; // 3-4 days
          } else {
            priority = 3; // 5+ days
          }
      }

      // Update the priority of the user in the database
      await User.update({ priority }, { where: { userId: user.userId } });
    }

    console.log('Priority assigned successfully');
    res.status(200).send("priority success");
  } catch (error) {
    console.error('Error assigning priority:', error);
  }
}




async function cronJob(req, res) {
  try {
    // Find users with priority 0
    const usersWithPriority0 = await User.findAll({
      where: { priority: 0 }
    });

    // Iterate through users with priority 0
    for (const user of usersWithPriority0) {
      // Send WhatsApp message to the user
      const phoneNumber = user.phone; // Assuming user.phone contains the phone number
      await client.messages.create({
        from: 'whatsapp:+14155238886', // Replace with your Twilio WhatsApp number
        to: `whatsapp:${phoneNumber}`, // User's WhatsApp number
        body: 'Your task is due soon. Please respond within 1 minute if you are available.',
      });
    }

    res.status(200).send('WhatsApp messages sent successfully to users with priority 0.');
  } catch (error) {
    console.error('Error sending WhatsApp messages:', error);
    res.status(500).send('Error sending WhatsApp messages.');
  }
}


module.exports = { taskCheck ,cronJob};
