'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollinatorSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Pollinator', PollinatorSchema);