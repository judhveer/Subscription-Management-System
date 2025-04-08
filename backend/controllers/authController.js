// controllers/authController.js
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ userId: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = generateToken(user.id, user.role);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  // controllers/authController.js
// ... existing code ...

module.exports = {
    register,
    login
  };