'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Order.belongsTo(models.User)
      // Order.belongsTo(models.Product, {
      //   foreignKey: 'productId'
      // })
    }
  }
  Order.init({
    salePrice: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};