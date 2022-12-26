const axios = require('axios');
const config = require('../config/config.json');

const sequelize = require('sequelize');
const db = require("../models");
const Forcast = db.Forcast;
const Location = db.Location;

module.exports = {
    getLocationsWeather: async function (geoLocations) {
        let locationsWeatherPromises = [];

        geoLocations.forEach(geoLocation => {
            locationsWeatherPromises.push(
                axios.get(`${config.openweathermap.base_url}?lat=${geoLocation.lat}&lon=${geoLocation.lng}&appid=${config.openweathermap.api_key}&lang=he&units=metric`)
                )
        });
        
        return Promise.all(locationsWeatherPromises);
    },
    
    normalizeRawweatherForcasts: (rawData, geoCodes) => {
        let normalizedWeatherForcasts = [];

        rawData.forEach(cityForcast => {
            let location_id = geoCodes.find(geoCode => {
                return geoCode.lat == cityForcast.data.city.coord.lat && geoCode.lng == cityForcast.data.city.coord.lon
            }).id;

            cityForcast.data.list.forEach(hourlyForcast => {
                normalizedWeatherForcasts.push({
                    LocationId: location_id,
                    temp: hourlyForcast.main.temp ,
                    timestamp: hourlyForcast.dt_txt ,
                    feels_like: hourlyForcast.main.feels_like ,
                    humidity: hourlyForcast.main.humidity 
                })
            });
        });

        return normalizedWeatherForcasts;
    },

    getLowestHumidity: async () => {
        const weather = await Forcast.findOne({
            include: { model: Location, as: 'Location'},
            order: [['humidity','ASC']]
          });

          return weather;
    },

    getFeelsLikeRank: async () => {
        const weather = await Forcast.findAll({
            where: {
              id: { 
                [sequelize.Op.in]: [sequelize.literal(`
                SELECT 
                    forcasts1.id
                  FROM (SELECT * FROM "Forcasts" WHERE timestamp > NOW() ) forcasts1
                  LEFT JOIN (SELECT * FROM "Forcasts" WHERE timestamp > NOW() ) forcasts2 ON 
                    forcasts1."LocationId" = forcasts2."LocationId" AND 
                    forcasts1.timestamp > forcasts2.timestamp
                  WHERE forcasts2.id IS NULL
                `)]
              }
            },
            include: { model: Location, as: 'Location'},
            order: [['feels_like','ASC']]
          });

          return weather;
    },
    getAvgTemp: async () => {
        const weather = await Forcast.findAll({
            attributes: [
              [sequelize.fn('DATE', sequelize.col('timestamp')), 'Date'],
              [sequelize.fn('AVG', sequelize.col('temp')),'avgTemp']
            ],
            include: { model: Location, as: 'Location'},
            group: [
              'Date',
              'Location.id'
            ],
            order: ['Date']
          });

          return weather;
    }
}