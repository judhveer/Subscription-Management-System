// controllers/servicePlanController.js (new)
const { ServicePlan, Service } = require('../models');


// Create Plan for a Service (Seller-only)
const createPlan = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { planType, price, duration, discountPercentage } = req.body;

    // Verify service exists and belongs to the seller
    const service = await Service.findOne({
      where: { id: serviceId, sellerId: req.user.userId }
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const plan = await ServicePlan.create({
      planType,
      price,
      duration,
      discountPercentage,
      serviceId
    });

    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Plans for a Service (Public)
const getPlans = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const plans = await ServicePlan.findAll({ where: { serviceId } });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPlan, getPlans };