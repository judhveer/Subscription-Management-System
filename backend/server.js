require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/service');
const subscriptionRoutes = require('./routes/subscription');
const initCronJobs = require('./utils/cron'); 
const paymentRoutes = require('./routes/payment');
const reportRoutes = require('./routes/report');

const publicRoutes = require('./routes/public');





// Start cron jobs after DB sync
sequelize.sync({ force: false })
.then(() => {
  app.listen(PORT, () => {
    initCronJobs(); // 👈 Start cron
    console.log(`Server running on port ${PORT}`);
  });
  });
  
  
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  // Middleware
  app.use(bodyParser.json());
  
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/subscriptions', subscriptionRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/public', publicRoutes);
  
// Database sync and server start
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      initCronJobs();
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });