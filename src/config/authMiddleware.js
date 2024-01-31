const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel'); // Assuming you have a User model

function checkAuthorize(req, res, next) {
  // Get the token from the request headers
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token is missing' });
//   }

//   // Verify the token
//   jwt.verify(token, 'abcdef', async (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     // Check if the user exists in the database
//     const user = await User.findOne({ where: { id: decodedToken.userId } });
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     // Attach the user object to the request for further use
//     req.user = user;
    next(); // Move to the next middleware or route handler
 // });
}

module.exports = { checkAuthorize };
