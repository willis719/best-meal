'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Macro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Macro.belongsTo(models.User)
    }
  };
  Macro.init({
    calories: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    fats: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Macro',
  });
  return Macro;
};