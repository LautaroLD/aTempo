'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // Status.belongsToMany(models.Order, {
      //   through: 'statusOrders',
      //   foreignKey: {
      //     name: 'statusId'
      //   }
      // })
    }
  }
  Status.init({
    status: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
    paranoid:true
  });
  return Status;
};