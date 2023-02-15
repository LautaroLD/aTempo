'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User,{
        foreignKey:'userId'
      })
      Cart.hasMany(models.ProductsInCart)
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    paranoid: true
  });
  return Cart;
};