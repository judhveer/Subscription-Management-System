// controllers/paymentController.js
const { Payment, Subscription, Invoice , ServicePlan, User, Service} = require('../models');
const { v4: uuidv4 } = require('uuid');
const { generateInvoicePDF } = require('../utils/pdfGenerator'); // 👈 Add this import



// controllers/paymentController.js (updated)
const createPayment = async (req, res) => {
    try {
      const { subscriptionId, amount, paymentMethod } = req.body;
      const payerId = req.user.userId;
  
      // Verify subscription exists
      const subscription = await Subscription.findByPk(subscriptionId, {
        include: [ServicePlan]
      });
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      // Generate invoice data
      const service = await Service.findByPk(subscription.ServicePlan.serviceId, {
        include: [{ model: User, as: 'seller' }]
      });
  
      // Generate PDF first
      const invoiceData = {
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: new Date(),
        sellerName: service.seller.username,
        buyerName: req.user.username,
        serviceName: service.name,
        planType: subscription.ServicePlan.planType,
        totalAmount: amount,
        status: 'paid'
      };
  
      // Generate PDF and get path
      // const { pdfPath } = await generateInvoicePDF(invoiceData);

      // Add timeout for PDF generation
    const pdfGeneration = generateInvoicePDF(invoiceData);
    const { pdfPath } = await Promise.race([
      pdfGeneration,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('PDF generation timeout')), 5000)
      )
    ]);


  
      // Create payment
      const payment = await Payment.create({
        amount,
        paymentMethod,
        payerId,
        subscriptionId,
        transactionId: `TXN-${uuidv4()}`,
        status: 'completed'
      });
  
      // Create invoice with PDF path
      const invoice = await Invoice.create({
        invoiceNumber: invoiceData.invoiceNumber,
        issueDate: invoiceData.issueDate,
        totalAmount: amount,
        status: 'paid',
        PaymentId: payment.id,
        pdfPath // 👈 Include PDF path here
      });
  
      res.status(201).json({ 
        payment, 
        invoice: { ...invoice.toJSON(), pdfUrl: `http://localhost:3000${pdfPath}` } 
      });
    } catch (err) {
      res.status(500).json({ 
        message: 'Server error',
        error: err.message 
      });
    }
  };

const getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            where: { payerId: req.user.userId },
            include: [{ model: Invoice }] // 👈 Explicitly specify model
        });
        res.json(payments);
    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = { createPayment, getPaymentHistory };