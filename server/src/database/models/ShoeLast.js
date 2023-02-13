'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoeLast extends Model {
    static associate(models) {
      ShoeLast.belongsToMany(models.Product, {
        through: 'ProductShoeLast',
        foreignKey: {
          name: 'shoeLastId'
        }
      })
    }
  }
  ShoeLast.init({
    nameShoelast: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShoeLast',
  });
  return ShoeLast;
};