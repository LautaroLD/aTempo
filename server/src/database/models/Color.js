'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.belongsToMany(models.Product, {
        through: 'ProductColors',
        foreignKey: {
          name: 'colorId'
        }
      })
    }
  }
  Color.init({
    colorName: DataTypes.STRING,
    colorValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};