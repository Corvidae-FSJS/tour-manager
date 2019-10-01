const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');
const { ObjectId } = Schema.Types;

const tourSchema = new Schema({
  title: RequiredString,
  activities: [{ type: String }],
  launchDate: {
    type: Date,
    default: () => new Date()
  }, 
  stops: [{ 
    type: ObjectId, 
    ref: 'Stops'
  }]
});

module.exports = mongoose.model('Tour', tourSchema);