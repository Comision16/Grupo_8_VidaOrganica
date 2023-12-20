'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // y te pertenece a un producto
      Item.belongsTo(models.Product, {
        as : 'product',
        foreignKey : 'productId'
      });

      // ORDER: a su vez un item pertenece a un producto
      Item.belongsTo(models.Order, {
        as : 'order',
        foreignKey : 'orderId'
      })
    }
  }
  Item.init({
    quantity: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};