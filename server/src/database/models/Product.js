'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      // Product.hasMany(models.Order); 
      // Product.hasMany(models.Favorite);

      //A la tabla de muchos a muchos Reviews habria q agregarle los atributos score(int) y comment(string)  
      // Product.belongsToMany(models.User, {
      //   through: 'Reviews',
      //   foreignKey: {
      //     name: 'productId'
      //   }
      // })
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