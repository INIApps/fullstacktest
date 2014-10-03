'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollinatorSchema = new Schema({
  flora: [String]
});

module.exports = mongoose.model('Pollinator', PollinatorSchema);