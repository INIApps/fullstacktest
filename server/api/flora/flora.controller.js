'use strict';

var _ = require('lodash');
var Flora = require('./flora.model');
var async = require('async');

var paginationAsync = function(req, res, query, perPagex, sortx){
  var perPage = perPagex || 25;
  var page = req.query.page > 0 ? req.query.page : 0;
  var sort = sortx || 'familia';
  var response = {};
  response.page = page;

  async.parallel([
    function(callback){
      Flora.find(query)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sort)
      .exec(function(err, data ){
        response.events = data;
        callback();
      });
    },
    function(callback){
      Flora.find(query).count().exec(function(err, data){
        response.count = data;
        callback();
      });
    }
  ], function(err){
    var total = Math.ceil(response.count / perPage);
    response.pages = total;
    return res.json(200, response);
  });
};


// Get list of floras
exports.index = function(req, res) {
  Flora.find(function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of transgenicas
exports.transgenicas = function(req, res) {

paginationAsync(req,res,{"type":4}, 40, 'familia');

};
// Get list of transgenicas resumida
exports.transgenicas_r = function(req, res) {
  Flora.find({"type":4},{"familia":1,"flujo":1,"tipo":1,"type":1,"taxa":1,"genero":1,"especie":1,"_id":1},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};

exports.transgenicas_filtradas = function(req, res) {
  var query = {"type":4, '$or':[
    {'_id':'53e0ea82eaf791fef256395c'},// Zea: 53e0ea82eaf791fef256395c, 
    {'_id':'53e0ea82eaf791fef256390a'},// soja: 53e0ea82eaf791fef256390a, 
    {'_id':'53e0ea82eaf791fef25638e5'},// raps: 53e0ea82eaf791fef25638e5, 
    {'_id':'53e0ea82eaf791fef256394c'},// papa: 53e0ea82eaf791fef256394c, 
    {'_id':'53e0ea82eaf791fef25638e1'},// remolacha: 53e0ea82eaf791fef25638e1, 
    {'_id':'53e0ea82eaf791fef256390b'},// algodon:53e0ea82eaf791fef256390b, 
    {'_id':'53e0ea82eaf791fef256391d'},// alfalfa: 53e0ea82eaf791fef256391d, 
    {'_id':'53e0ea82eaf791fef256394a'},// tomate:53e0ea82eaf791fef256394a, 
    {'_id':'53e0ea82eaf791fef256395a'},// vid: 53e0ea82eaf791fef256395a, 
    {'_id':'53e0ea82eaf791fef2563952'},// trigo:53e0ea82eaf791fef2563952
    {'_id':'53e0ea82eaf791fef2563924'} // arroz:53e0ea82eaf791fef2563924
    ]}; 
  Flora.find(query,{"familia":1,"flujo":1,"tipo":1,"type":1,"taxa":1,"genero":1,"especie":1,"_id":1,"nameEs":1},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of cultivadas
exports.cultivadas = function(req, res) {
  // Flora.find({"type":1},function (err, floras) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, floras);
  // });
paginationAsync(req,res,{"type":1}, 40, 'familia');
};
// Get list of cultivadas resumida
exports.cultivadas_r = function(req, res) {
  Flora.find({"type":1},{"familia":1,"tipo":1,"type":1,"taxa":1,"genero":1,"especie":1,"_id":1},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
// Get list of transgenicas
exports.introducidas = function(req, res) {
  // Flora.find({"type":2},function (err, floras) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, floras);
  // });
  paginationAsync(req,res,{"type":2}, 70, 'familia');
};
// Get list of transgenicas
exports.nativas = function(req, res) {
  // Flora.find({"type":3},function (err, floras) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, floras);
  // });
  paginationAsync(req,res,{"type":3}, 100, 'familia');
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

  // Flora.find({},{},{ limit: 5 })
  // .exec(function (err, data){
  //   if(err) { return handleError(res, err); }
  //   if(!data) { return res.send(404); }
  //   return data;
  // })
  // .then(function(data){
  //   for (var i = data.length - 1; i >= 0; i--) {
  //     data[i]
  //   }
  //   return data;
  // })
  // .then(function(data){
  //   return res.json(data);
  // });

};
// Get list of species relacionadas para informe
exports.relacion_informe = function(req, res) {
  var objR = {'$or':[{'type':1},{'type':3},]};
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

// Edition Area
//filtrado
// Get list of cultivadas resumida
exports.familia = function(req, res) {
  Flora.distinct('familia',function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
exports.genero = function(req, res) {
  Flora.distinct('genero',{'familia':req.params.familia},function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.json(200, floras);
  });
};
exports.related = function(req, res) {
  var objR = {};
  objR.genero = req.params.genero;
  Flora.find(objR, function (err, flora) {
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