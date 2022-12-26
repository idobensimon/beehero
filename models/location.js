'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Forcast)
    }
  }
  Location.init({
    // id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};