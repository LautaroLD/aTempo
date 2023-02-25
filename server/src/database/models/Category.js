'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: 'ProductCategories'
      })
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    paranoid: true
  });
  return Category;
};