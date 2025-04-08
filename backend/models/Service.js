// models/Service.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    category: {
      type: DataTypes.ENUM('gym', 'yoga', 'tuition', 'weight_training'),
      allowNull: false
    }
  });

  // Define associations
  Service.associate = (models) => {
    Service.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller'
    });
    Service.hasMany(models.ServicePlan, { foreignKey: 'serviceId' });
  };

  return Service;
};