'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.coin.belongsTo(models.User,{foreignKey:'userid', key:'id'})
    }
  }
  coin.init({
    rank: DataTypes.STRING,
    symbol: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    percentage: DataTypes.STRING,
    volume: DataTypes.STRING,
    cap: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'coin',
  });
  return coin;
};