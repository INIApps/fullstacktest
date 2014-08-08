'use strict';

var _ = require('lodash');
var Transgenico = require('./transgenico.model');

// Get list of transgenicos
exports.index = function(req, res) {
  Transgenico.find(function (err, transgenicos) {
    if(err) { return handleError(res, err); }
    return res.json(200, transgenicos);
  });
};

// Get a single transgenico
exports.show = function(req, res) {
  Transgenico.findById(req.params.id, function (err, transgenico) {
    if(err) { return handleError(res, err); }
    if(!transgenico) { return res.send(404); }
    return res.json(transgenico);
  });
};

// Creates a new transgenico in the DB.
exports.create = function(req, res) {
  Transgenico.create(req.body, function(err, transgenico) {
    if(err) { return handleError(res, err); }
    return res.json(201, transgenico);
  });
};

// Updates an existing transgenico in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Transgenico.findById(req.params.id, function (err, transgenico) {
    if (err) { return handleError(res, err); }
    if(!transgenico) { return res.send(404); }
    var updated = _.merge(transgenico, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, transgenico);
    });
  });
};

// Deletes a transgenico from the DB.
exports.destroy = function(req, res) {
  Transgenico.findById(req.params.id, function (err, transgenico) {
    if(err) { return handleError(res, err); }
    if(!transgenico) { return res.send(404); }
    transgenico.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}