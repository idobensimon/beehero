const config = require('../config/config.json')['development'];
const geoCodingCtrl = require("../controllers/geo_coding");
const weatherCtrl = require("../controllers/weather");

const db = require("../models");
const Location = db.Location;
const Forcast = db.Forcast;

const CITIES = ['Jerusalem','Tel Aviv','Haifa'];

module.exports = {
    init: async function () {
        const geoCodes = await geoCodingCtrl.getCitiesGeoCodes(CITIES);

        const geoCodesNormalized = geoCodingCtrl.normalizeRawGeoCodes(geoCodes);
        
        const dbGeoCodes = await Location.bulkCreate(geoCodesNormalized);
        
        const weatherForcasts = await weatherCtrl.getLocationsWeather(geoCodesNormalized);

        let weatherForcastsNormalized = weatherCtrl.normalizeRawweatherForcasts(weatherForcasts,dbGeoCodes);

        //add some mock data so we can test feels_like_rank
        weatherForcastsNormalized.push({   
            LocationId: 1,   
            temp: 9.41,   
            timestamp: "2022-12-25 00:00:00",   
            feels_like: 7.99,   
            humidity: 94
        });

        weatherForcastsNormalized.push({   
                LocationId: 2,   
                temp: 9.41,   
                timestamp: "2022-12-25 00:00:00",   
                feels_like: 7.99,   
                humidity: 94
            });

        return Forcast.bulkCreate(weatherForcastsNormalized);
    }
}