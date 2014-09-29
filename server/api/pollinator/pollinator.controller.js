'use strict';

var _ = require('lodash');
var Pollinator = require('./pollinator.model');

// Get list of pollinators
exports.index = function(req, res) {
  Pollinator.find(function (err, pollinators) {
    if(err) { return handleError(res, err); }
    return res.json(200, pollinators);
  });
};

// Get a single pollinator
exports.show = function(req, res) {
  Pollinator.findById(req.params.id, function (err, pollinator) {
    if(err) { return handleError(res, err); }
    if(!pollinator) { return res.send(404); }
    return res.json(pollinator);
  });
};

// Get a single pollinator
exports.showlink = function(req, res) {
  var obj = {'idLink':parseInt(req.params.id)};
  Pollinator.find(obj, function (err, pollinator) {
    if(err) { return handleError(res, err); }
    if(!pollinator) { return res.send(404); }
    return res.json(pollinator);
  });
};

// Get a single pollinator
exports.getMatch = function(req, res) {
  var ida = req.params.idA;
  var idb = req.params.idB;
  var obj = {'$and':[{'flora':ida},{'flora':idb}]};
  var objOpt = {'taxa':1,'orden':1};

  Pollinator.find(obj,objOpt, function (err, pollinator) {
    if(err) { return handleError(res, err); }
    if(!pollinator) { return res.send(404); }
    return res.json(pollinator);
  });
};

// Get a single pollinator
exports.getMatchSingle = function(req, res) {
  var ida = req.params.idA;
  var obj = {'flora':ida};
  var objOpt = {'taxa':1,'orden':1};

  Pollinator.find(obj,objOpt, function (err, pollinator) {
    console.log(pollinator);
    if(err) { return handleError(res, err); }
    if(!pollinator) { return res.send(404); }
    return res.json(pollinator);
  });
};

// Creates a new pollinator in the DB.
exports.create = function(req, res) {
  Pollinator.create(req.body, function(err, pollinator) {
    if(err) { return handleError(res, err); }
    return res.json(201, pollinator);
  });
};

// Updates an existing pollinator in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pollinator.findById(req.params.id, function (err, pollinator) {
    if (err) { return handleError(res, err); }
    if(!pollinator) { return res.send(404); }
    var updated = _.merge(pollinator, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pollinator);
    });
  });
};

// Deletes a pollinator from the DB.
exports.destroy = function(req, res) {
  Pollinator.findById(req.params.id, function (err, pollinator) {
    if(err) { return handleError(res, err); }
    if(!pollinator) { return res.send(404); }
    pollinator.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}