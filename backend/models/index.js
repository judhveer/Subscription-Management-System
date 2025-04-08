// models/index.js (updated)
const Sequelize = require('sequelize');
const config = require('../config/config.json').development;


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql'
});


// 1. Initialize all models first
const User = require('./User')(sequelize);
const Service = require('./Service')(sequelize);
const ServicePlan = require('./ServicePlan')(sequelize);
const Subscription = require('./Subscription')(sequelize);
const Payment = require('./Payment')(sequelize);
const Invoice = require('./Invoice')(sequelize);





// Set associations
Service.associate({ User, ServicePlan }); // 👈 Updated
ServicePlan.associate({ Service, Subscription, Payment }); // 👈 New
Subscription.associate({ User, ServicePlan, Payment });
Payment.associate({ User, Subscription, Invoice });
Invoice.associate({ Payment });


User.hasMany(Subscription, { foreignKey: 'buyerId' });
ServicePlan.hasMany(Subscription, { foreignKey: 'planId' });

const db = {
  User,
  Service,
  ServicePlan,
  Subscription,
  Payment,
  Invoice,
  sequelize,
  Sequelize
};


module.exports = db;