'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Address, {
        foreignKey: 'userId'
      })
      User.belongsToMany(models.Product, {
        through: 'Favorites',
        foreignKey: {
          name: 'userId'
        }
      })
      User.hasMany(models.Review);
      //A la tabla de muchos a muchos Reviews habria q agregarle los atributos score(int) y comment(string)  
      // User.belongsToMany(models.Product, {
      //   through: 'Reviews',
      //   foreignKey: {
      //     name: 'userId'
      //   }
      // })
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    documentId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};