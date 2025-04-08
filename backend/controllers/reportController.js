// controllers/reportController.js
const { Service, ServicePlan, Subscription, Payment } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models');


// 1. Active Members per Service
// controllers/reportController.js (final fix)
const getActiveMembers = async (req, res) => {
    try {
      const activeSubs = await Service.findAll({
        where: { sellerId: req.user.userId },
        attributes: [
          'id',
          'name',
          [sequelize.literal(`
            (SELECT COUNT(*) 
             FROM ServicePlans AS sp 
             JOIN Subscriptions AS sub 
             ON sp.id = sub.planId 
             WHERE sp.serviceId = Service.id 
             AND sub.status = 'active')
          `), 'activeMembers']
        ],
        raw: true
      });
  
      res.json(activeSubs);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

// 2. Expiring Soon Subscriptions (within 7 days)
const getExpiringSubscriptions = async (req, res) => {
  try {
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    const expiring = await Subscription.findAll({
      include: [{
        model: ServicePlan,
        include: [{
          model: Service,
          where: { sellerId: req.user.userId }
        }]
      }],
      where: {
        endDate: { [Op.between]: [new Date(), sevenDaysLater] },
        status: 'active'
      }
    });

    res.json(expiring);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 3. Service-wise Revenue
// controllers/reportController.js (updated)
const getServiceRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const revenue = await Service.findAll({
      where: { sellerId: req.user.userId },
      attributes: [
        'id',
        'name',
        [
          sequelize.literal(`
            (SELECT COALESCE(SUM(payments.amount), 0) 
             FROM Services AS service
             LEFT JOIN ServicePlans AS plans ON service.id = plans.serviceId
             LEFT JOIN Subscriptions AS subs ON plans.id = subs.planId
             LEFT JOIN Payments AS payments ON subs.id = payments.subscriptionId
             WHERE service.id = Service.id
             AND payments.status = 'completed'
             ${startDate && endDate ? 
               `AND payments.createdAt BETWEEN '${startDate}' AND '${endDate}'` 
             : ''}
            )
          `),
          'totalRevenue'
        ]
      ],
      group: ['Service.id', 'Service.name'], // Add all non-aggregated columns
      raw: true
    });

    res.json(revenue);
  } catch (err) {
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

module.exports = { getActiveMembers, getExpiringSubscriptions, getServiceRevenue };