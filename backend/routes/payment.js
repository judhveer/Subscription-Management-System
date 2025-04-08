// routes/payment.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { createPayment, getPaymentHistory } = require('../controllers/paymentController');

router.post('/', authenticate(['buyer']), createPayment);
router.get('/', authenticate(['buyer']), getPaymentHistory);

module.exports = router;