const axios = require('axios');
const config = require('../config/config.json');

module.exports = {
    getCitiesGeoCodes: async function (cities) {
        let citiesGeoCodePromises = [];
        cities.forEach(city => {
            citiesGeoCodePromises.push(
                axios.get(`${config.googleApi.base_url}?address=${city}&key=${config.googleApi.api_key}`)
                )
        });
        return Promise.all(citiesGeoCodePromises);
    },

    normalizeRawGeoCodes: (rawGeoCodes) => {
        return rawGeoCodes.map(geoCode => {
            return {
                lat : geoCode.data.results[0].geometry.location.lat.toFixed(4),
                lng : geoCode.data.results[0].geometry.location.lng.toFixed(4),
                name : geoCode.data.results[0].address_components[0].short_name
            }
        });
    }
}