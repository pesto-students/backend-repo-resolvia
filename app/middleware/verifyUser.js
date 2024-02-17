const jwt = require('jsonwebtoken');
const errorHandler = require('./error.js');
const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  //console.log(token);
  if (!token) {
    return next(errorHandler(401, 'Unauthorized user'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized user'));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
