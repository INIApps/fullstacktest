'use strict';

var _ = require('lodash');
var Flora = require('./flora.model');

// Get list of floras
exports.index = function(req, res) {
  Flora.find(function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of transgenicas
exports.transgenicas = function(req, res) {
  Flora.find({"type":4},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of transgenicas resumida
exports.transgenicas_r = function(req, res) {
  Flora.find({"type":4},{"familia":1,"flujo":1,"tipo":1,"type":1,"taxa":1,"genero":1,"especie":1,"_id":0},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of cultivadas
exports.cultivadas = function(req, res) {
  Flora.find({"type":1},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of cultivadas resumida
exports.cultivadas_r = function(req, res) {
  Flora.find({"type":1},{"familia":1,"tipo":1,"type":1,"taxa":1,"genero":1,"especie":1,"_id":0},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of transgenicas
exports.introducidas = function(req, res) {
  Flora.find({"type":2},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of transgenicas
exports.nativas = function(req, res) {
  Flora.find({"type":3},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of species relacionadas
exports.relacion = function(req, res) {
  var objR = {};
  objR.genero = req.params.genero;
  Flora.find(objR, function (err, flora) {
    if(err) { return handleError(res, err); }
    if(!flora) { return res.send(404); }
    return res.json(flora);
  });
};

// Get a single flora
exports.show = function(req, res) {
  Flora.findById(req.params.id, function (err, flora) {
    if(err) { return handleError(res, err); }
    if(!flora) { return res.send(404); }
    return res.json(flora);
  });
};

// Creates a new flora in the DB.
exports.create = function(req, res) {
  Flora.create(req.body, function(err, flora) {
    if(err) { return handleError(res, err); }
    return res.json(201, flora);
  });
};

// Updates an existing flora in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Flora.findById(req.params.id, function (err, flora) {
    if (err) { return handleError(res, err); }
    if(!flora) { return res.send(404); }
    var updated = _.merge(flora, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, flora);
    });
  });
};

// Deletes a flora from the DB.
exports.destroy = function(req, res) {
  Flora.findById(req.params.id, function (err, flora) {
    if(err) { return handleError(res, err); }
    if(!flora) { return res.send(404); }
    flora.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}