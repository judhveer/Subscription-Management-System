// routes/public.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { Invoice } = require('../models');

// Serve PDF files statically
router.use('/invoices', express.static(path.join(__dirname, '../public/invoices')));

// Public invoice viewer (with security token)
router.get('/invoices/:invoiceNumber', async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ 
      where: { invoiceNumber: req.params.invoiceNumber } 
    });

    if (!invoice) return res.status(404).send('Invoice not found');
    
    res.sendFile(path.resolve(__dirname, `../public/${invoice.pdfPath}`));
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;