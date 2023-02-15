'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsInCart extends Model {
    static associate(models) {
      ProductsInCart.belongsTo(models.Cart)
      ProductsInCart.belongsTo(models.Product);
    }
  }
  ProductsInCart.init({
    quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProductsInCart',
    paranoid:true
  });
  return ProductsInCart;
};