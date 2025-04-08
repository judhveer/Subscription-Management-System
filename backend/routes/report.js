// routes/report.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const reportController = require('../controllers/reportController');

// Seller-only routes
router.get('/active-members', authenticate(['seller']), reportController.getActiveMembers);
router.get('/expiring-soon', authenticate(['seller']), reportController.getExpiringSubscriptions);
router.get('/revenue', authenticate(['seller']), reportController.getServiceRevenue);

module.exports = router;