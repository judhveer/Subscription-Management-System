// routes/service.js (updated)
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { createService } = require('../controllers/serviceController');
const { createPlan, getPlans } = require('../controllers/servicePlanController'); // 👈 New

// Existing service creation
router.post('/', authenticate(['seller']), createService);

// New service plan routes
router.post('/:serviceId/plans', authenticate(['seller']), createPlan);
router.get('/:serviceId/plans', getPlans);

module.exports = router;