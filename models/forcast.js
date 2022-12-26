'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forcast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Location);
    }
  }
  Forcast.init({
    // id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    timestamp: DataTypes.DATE,
    temp: DataTypes.DECIMAL,
    feels_like: DataTypes.DECIMAL,
    humidity: DataTypes.INTEGER,
    // location_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Forcast',
  });
  return Forcast;
};