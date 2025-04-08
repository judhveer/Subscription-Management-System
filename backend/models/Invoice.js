// models/Invoice.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    taxAmount: DataTypes.FLOAT,
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('paid', 'unpaid', 'overdue'),
      defaultValue: 'unpaid'
    },
    pdfPath: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });

  // models/Invoice.js
Invoice.associate = (models) => {
    Invoice.belongsTo(models.Payment, { 
      foreignKey: 'PaymentId', // 👈 Match the field name used in migration/definition
      onDelete: 'CASCADE' 
    });
  };

  return Invoice;
};