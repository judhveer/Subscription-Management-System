// utils/cron.js (new file)
const cron = require('node-cron');
const { Subscription } = require('../models');
const { Op } = require('sequelize');

const checkExpiredSubscriptions = async () => {
  try {
    // Disable expired subscriptions
    await Subscription.update(
      { status: 'expired' },
      {
        where: {
          endDate: { [Op.lt]: new Date() },
          status: 'active'
        }
      }
    );
    console.log('Cron: Expired subscriptions updated');
  } catch (err) {
    console.error('Cron job error:', err);
  }
};

// Temporarily change schedule to every minute
const initCronJobs = () => {
    cron.schedule('0 0 * * *', checkExpiredSubscriptions); //  Runs every minute
};

module.exports = initCronJobs;