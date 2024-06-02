const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = (role = null) => {
  return async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret_key');
      const user = await User.findOne({ where: { username: decoded.username } });

      if (!user) {
        throw new Error();
      }

      if (role && user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Please authenticate' });
    }
  };
};

module.exports = auth;