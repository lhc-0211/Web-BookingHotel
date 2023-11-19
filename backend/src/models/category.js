'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Hotel, { foreignKey: 'categoryId' })
    }
  }
  Category.init({
    categoryName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    styleIcon: DataTypes.STRING,
    detail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true

  });

  Category.beforeCreate((Category, _) => {
    return Category.id = uuidv4();
  });

  return Category;
};