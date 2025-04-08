// middlewares/auth.js
const { verifyToken } = require('../utils/jwt');

const authenticate = (roles) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    try {
      const decoded = verifyToken(token);
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Permission denied' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authenticate;