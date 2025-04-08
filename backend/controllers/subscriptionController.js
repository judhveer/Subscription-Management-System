// controllers/subscriptionController.js
const { Subscription, ServicePlan, Service } = require('../models');
const { Op } = require('sequelize');

const createSubscription = async (req, res) => {
    try {
        const { planId, startDate } = req.body;
        const buyerId = req.user.userId;

        // Get plan duration
        const plan = await ServicePlan.findByPk(planId);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        // Calculate end date
        const start = new Date(startDate);
        const endDate = new Date(start);
        endDate.setDate(start.getDate() + plan.duration);

        // Check overlapping subscriptions
        const overlap = await Subscription.findOne({
            where: {
                buyerId,
                planId,
                [Op.or]: [
                    {
                        startDate: { [Op.lte]: endDate },
                        endDate: { [Op.gte]: start }
                    }
                ]
            }
        });

        if (overlap) {
            return res.status(400).json({
                message: 'Overlapping subscription exists'
            });
        }

        // Create subscription
        const subscription = await Subscription.create({
            startDate: start,
            endDate,
            buyerId,
            planId
        });

        res.status(201).json(subscription);
    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};

// controllers/subscriptionController.js (add new method)
const getSubscriptions = async (req, res) => {
    try {
      const { startDate, endDate, status } = req.query;
      const buyerId = req.user.userId;
  
      const where = { buyerId };
      if (status) where.status = status;
      
      if (startDate && endDate) {
        where.startDate = { [Op.between]: [startDate, endDate] };
      }
  
      const subscriptions = await Subscription.findAll({
        where,
        include: [{ model: ServicePlan, include: [Service] }] // Get plan details
      });
  
      res.json(subscriptions);
    } catch (err) {
      res.status(500).json({ 
        message: 'Server error',
        error: err.message 
      });
    }
  };
  
  // Update exports
module.exports = { createSubscription, getSubscriptions };
