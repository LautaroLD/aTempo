'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoeLast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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