// eslint-disable-next-line new-cap
const router = require('express').Router();
const Location = require('../models/location');
const addGeo = require('../middleware/add-geolocation');