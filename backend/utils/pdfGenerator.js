// utils/pdfGenerator.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateInvoicePDF = async (invoiceData) => {
  const doc = new PDFDocument();
  const fileName = `invoice_${uuidv4()}.pdf`;
  const filePath = path.join(__dirname, '../public/invoices', fileName);
  
  // Create public directory if not exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // Pipe PDF to filesystem
  doc.pipe(fs.createWriteStream(filePath));

  // Add content
  doc.fontSize(25).text('Invoice', { underline: true });
  doc.fontSize(14)
    .text(`Invoice #: ${invoiceData.invoiceNumber}`)
    .text(`Date: ${invoiceData.issueDate.toDateString()}`)
    .text(`Seller: ${invoiceData.sellerName}`)
    .text(`Buyer: ${invoiceData.buyerName}`)
    .moveDown()
    .text(`Service: ${invoiceData.serviceName} (${invoiceData.planType})`)
    .text(`Amount: $${invoiceData.totalAmount}`)
    .text(`Status: ${invoiceData.status}`);

  doc.end();

  return new Promise((resolve) => {
    doc.on('finish', () => resolve({
      pdfPath: `/invoices/${fileName}`,
      fileName
    }));
  });
};

module.exports = { generateInvoicePDF };

