// utils/jwt.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };