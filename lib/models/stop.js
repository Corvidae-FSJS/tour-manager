const mongoose = require('mongoose');
const { Schema } = mongoose;
//const { RequiredString } = require('./required-types');
const stopSchema = new Schema({
  location: {
    latitude: Number,
    longitude: Number
  },
  weather: { 
    any: 'object', //will get from weather api 
  },
  attendance: {
    type: Number
  }
});

module.exports = mongoose.model('Stop', stopSchema);