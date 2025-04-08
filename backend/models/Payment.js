// models/Payment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING, // e.g., 'credit_card', 'paypal'
            allowNull: false
        },
        transactionId: {
            type: DataTypes.STRING,
            unique: true
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending'
        }
    });

    // models/Payment.js
    Payment.associate = (models) => {
        Payment.belongsTo(models.User, { foreignKey: 'payerId' });
        Payment.belongsTo(models.Subscription, { foreignKey: 'subscriptionId' });
        Payment.hasOne(models.Invoice); // 👈 Add this line
    };

    return Payment;
};