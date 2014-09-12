'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransgenicoSchema = new Schema({
	familia: String,
	genero: String,
	krap: String
});

module.exports = mongoose.model('Transgenico', TransgenicoSchema);