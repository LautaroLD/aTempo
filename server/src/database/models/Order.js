'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Order.belongsToMany(models.Status, {
        through: 'statusOrders',
        foreignKey: {
          name: 'orderId'
        }
      })
      Order.hasMany(models.ProductsInOrder)
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
    paranoid: true
  });
  return Order;
};