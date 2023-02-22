'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Address, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Order, {
        foreignKey: 'userId'
      })
      User.belongsToMany(models.Product, {
        through: 'Favorites',
        foreignKey: {
          name: 'userId'
        }
      })
      User.hasMany(models.Review);
      User.hasOne(models.Cart,{
        foreignKey:'userId'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    documentId: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};