// models/ServicePlan.js (new)
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ServicePlan = sequelize.define('ServicePlan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    planType: {
      type: DataTypes.ENUM('monthly', 'quarterly', 'yearly'),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER, // in days
      allowNull: false
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  });

  ServicePlan.associate = (models) => {
    ServicePlan.belongsTo(models.Service, { foreignKey: 'serviceId' });
    ServicePlan.hasMany(models.Subscription);
    ServicePlan.hasMany(models.Payment);
  };

  return ServicePlan;
};