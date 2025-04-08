// models/Subscription.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'expired', 'cancelled'),
      defaultValue: 'active'
    }
  });

  Subscription.associate = (models) => {

      
      Subscription.belongsTo(models.User, { foreignKey: 'buyerId' });
      Subscription.belongsTo(models.ServicePlan, { foreignKey: 'planId' });
      Subscription.hasMany(models.Payment, { foreignKey: 'subscriptionId' });
  };

  return Subscription;
};