'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
	type: String,
	slug: String,
	url: String,
	status: String,
	title: String,
	content: String,
	excerpt: String,
	created: Date,
	updated: { type: Date, default: Date.now },
	categories: [Categorias],
	tags : [Tags],
	author : Author
});

var Author = new Schema({
	slug: String,
	title: String,
	description: String
});

var Categorias = new Schema({
	slug: String,
	title: String,
	description: String
});

var Tags = new Schema({
	slug: String,
	title: String,
	description: String
});

module.exports = mongoose.model('Blog', BlogSchema);