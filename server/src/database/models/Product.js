'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: 'ProductCategories',
        foreignKey: {
          name: 'productId'
        }
      })
      Product.belongsToMany(models.Color, {
        through: 'ProductColors',
        foreignKey: {
          name: 'productId'
        }
      })
      Product.belongsToMany(models.Size, {
        through: 'ProductSize',
        foreignKey: {
          name: 'productId'
        }
      })
      Product.belongsToMany(models.ShoeLast, {
        through: 'ProductShoeLast',
        foreignKey: {
          name: 'productId'
        }
      })
      Product.belongsToMany(models.User, {
        through: 'Favorites',
        foreignKey: {
          name: 'productId'
        }
      })
      Product.belongsTo(models.Brand);
      Product.hasMany(models.ProductImg);
      Product.hasMany(models.Review);
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantityInStock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};