'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isAlpha: { msg:"Category name must contain only letters" },
        len: {
          args: [3,50],
          msg: "Category name must contain beetwen 3 and 50 letters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};