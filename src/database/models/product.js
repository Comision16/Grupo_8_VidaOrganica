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
      Product.belongsToMany(models.Brand);
      Product.belongsToMany(models.Category);
      Product.belongsToMany(models.Section);
      Product.belongsToMany(models.Image);
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    // brandId: DataTypes.INTEGER,
    brandId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "brands", //referencia a la tabla 
        key: "id" //foreignKey de la tabla
      }
    },
    // categoryId: DataTypes.INTEGER,
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id"
      }
    },
    // setionId: DataTypes.INTEGER,
    sectionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "sections",
        key: "id"
      }
    },
    // imageId: DataTypes.INTEGER
    imageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "images", 
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};