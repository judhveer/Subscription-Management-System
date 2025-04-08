// routes/subscription.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { createSubscription, getSubscriptions } = require('../controllers/subscriptionController');


router.post('/', authenticate(['buyer']), createSubscription);
router.get('/', authenticate(['buyer']), getSubscriptions); 

module.exports = router;