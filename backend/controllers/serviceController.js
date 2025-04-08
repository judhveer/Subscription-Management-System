// controllers/serviceController.js (corrected)
// controllers/serviceController.js
const { Service } = require('../models'); // 👈 Correct import

const createService = async (req, res) => {
  try {
    const { name, description, category } = req.body; // 👈 Use category
    const service = await Service.create({
      name,
      description,
      category, // 👈 Added
      sellerId: req.user.userId
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ 
      message: 'Server error',
      error: err.message // 👈 Add error details for debugging
    });
  }
};
// controllers/serviceController.js
// ... existing code ...

module.exports = {
    createService
  };