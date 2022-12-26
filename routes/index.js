var express = require('express');
var router = express.Router();
const sequelize = require('sequelize');

const db = require("../models");
const Forcast = db.Forcast;
const Location = db.Location;

const weatherCtrl = require("../controllers/weather");

/* GET home page. */
router.get('/avg_tmp_per_city_per_day', async function(req, res, next) {
  try {
    const result = await weatherCtrl.getAvgTemp();
    
    res.json(result);
  } catch (err) {
    res.json({err})
  }
});

router.get('/lowest_humid', async function(req, res, next) {
  try {
    const result = await weatherCtrl.getLowestHumidity();
    res.json(result);
  } catch (err) {
    res.json({err})
  }
});

router.get('/feels_like_rank', async function(req, res, next) {
  try {
    const result = await weatherCtrl.getFeelsLikeRank();
    
    res.json(result);
  } catch (err) {
    res.json({err})
  }
});

module.exports = router;
