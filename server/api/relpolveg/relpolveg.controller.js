'use strict';

var _ = require('lodash');
var Relpolveg = require('./relpolveg.model');
var Pollinator = require('../pollinator/pollinator.model');

// Get list of relpolvegs
exports.getPolMatch = function(req, res) {
  // var ida = req.params.idA;
  // var idb = req.params.idB;
  // var objR = {'$or':[{'idVeg':ida},{'idVeg':idb}]};

  // Relpolveg.find(objR, function (err, relpolvegs) {
  //   if(err) { return handleError(res, err); }

  //   // testing: estas variables corresponderian a ida e idb
  //   // ida = '53e0eec7eaf791fef2566014';
  //   // idb = '53e0eec7eaf791fef2565f4f';

  //   //para test
  //   // var relpolvegs = [
  //   //   {"_id":"5821e36d96af84e1606080e1","idPol":35,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e1","idPol":2,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e2","idPol":11,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e3","idPol":18,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e4","idPol":22,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e5","idPol":47,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e6","idPol":58,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e7","idPol":66,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e8","idPol":70,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080e9","idPol":72,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080ea","idPol":82,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080eb","idPol":84,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080ec","idPol":135,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080ed","idPol":137,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080ee","idPol":139,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080ef","idPol":77,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080f0","idPol":81,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080f1","idPol":114,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5421e36d96af84e1606080f2","idPol":31,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   {"_id":"5821e36d96af84e1606080e1","idPol":35,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e1","idPol":2,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e2","idPol":11,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e3","idPol":18,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e4","idPol":22,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e5","idPol":47,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e6","idPol":58,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e7","idPol":66,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e8","idPol":70,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080e9","idPol":72,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080ea","idPol":82,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080eb","idPol":84,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080ec","idPol":135,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080ed","idPol":137,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080ee","idPol":139,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080ef","idPol":77,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080f0","idPol":81,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080f1","idPol":114,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   {"_id":"5421e36d96af84e1606080f2","idPol":31,"idVeg":"53e0eec7eaf791fef2565f4f"},

  //   //   // {"_id":"5421e36d96af84e1606080f3","idPol":8,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   // {"_id":"5421e36d96af84e1606080f4","idPol":23,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   // {"_id":"5421e36d96af84e1606080f5","idPol":58,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   // {"_id":"5421e36d96af84e1606080f6","idPol":88,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   // {"_id":"5421e36d96af84e1606080f7","idPol":116,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   // {"_id":"5421e36d96af84e1606080f8","idPol":27,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   // {"_id":"5421e36d96af84e1606080f9","idPol":39,"idVeg":"53e0eec7eaf791fef2565f4f"},
  //   //   // {"_id":"5421e36d96af84e1606080fa","idPol":80,"idVeg":"53e0eec7eaf791fef2565f4f"},

  //   //   // {"_id":"5421e36d96af84e1606080fb","idPol":119,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e1606080fc","idPol":30,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e1606080fd","idPol":6,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e1606080fe","idPol":35,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e1606080ff","idPol":117,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e160608100","idPol":19,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e160608101","idPol":24,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e160608102","idPol":138,"idVeg":"53e0eec7eaf791fef2566014"},
  //   //   // {"_id":"5421e36d96af84e160608103","idPol":32,"idVeg":"53e0eec7eaf791fef2566014"}
  //   // ];

  //   //para encontrar match de polinizadores entre especies vegetales
  //   var match = [];
  //   for (var i = relpolvegs.length - 1; i >= 0; i--) {
  //     for (var e = relpolvegs.length - 1; e >= 0; e--) {
  //       if(relpolvegs[i].idPol===relpolvegs[e].idPol && relpolvegs[i].idVeg != relpolvegs[e].idVeg){
  //         match.push(relpolvegs[i].idPol);
  //       }
  //     };
  //   };
    
  //   //para colectar los idPol
  //   var idPolArray = [];
  //   for (var i = relpolvegs.length - 1; i >= 0; i--) {
  //     idPolArray.push(relpolvegs[i].idPol);
  //   }

  //   // para hacer el objeto query
  //   var idLinkArray = [];
  //   for (var i = match.length - 1; i >= 0; i--) {
  //     idLinkArray.push({'idLink':idPolArray[i]});
  //   }

  //   //query para polinizadores
  //   var query = {'$or':idLinkArray};

  //   // para testing
  //   //var query = {'$or':[{'idLink':12},{'idLink':32},{'idLink':1},{'idLink':2},{'idLink':62},{'idLink':11},{'idLink':7},{'idLink':5},{'idLink':22}]};
    
  //   Pollinator.find(query,function (err, data){
  //     if(err) { return handleError(res, err); }
  //     return res.json(200, data);
  //   });

  // });
return res.json(200, 'data');
};
// Get list of relpolvegs
// exports.getPolMatchSingle = function(req, res) {
//   var ida = req.params.idA;
//   var objR = {'idVeg':ida};
//   Relpolveg.find(objR, function (err, relpolvegs) {
//     if(err) { return handleError(res, err); }
//     var match = [];
//     for (var i = relpolvegs.length - 1; i >= 0; i--) {
//       for (var e = relpolvegs.length - 1; e >= 0; e--) {
//         if(relpolvegs[e].idPol === relpolvegs[i].idPol && relpolvegs[e]._id !== relpolvegs[i]._id)
//           if(match.length === 0){
//             match.push = relpolvegs[i];
//           }
//           if(match.length > 0){
//             var Existe = false;
//             for (var j = match.length - 1; j >= 0; j--) {
//               if(match[j]===relpolvegs[i]._id){ Existe = true; }
//             }
//             if(!Existe){
//               match.push = relpolvegs[i];
//             }
//           }
//       };
//     };
//     var idLinkArray = [];
//     for (var i = match.length - 1; i >= 0; i--) {
//       idLinkArray.push = {'idLink':match[i].idPol};
//     };
//     //var query = {'$or':idLinkArray};
//     var query = {'$or':[{'idLink':12},{'idLink':32},{'idLink':1},{'idLink':2},{'idLink':62},{'idLink':11},{'idLink':7},{'idLink':5},{'idLink':22}]};
    
//     Pollinator.find(query,function (err, data){
//       if(err) { return handleError(res, err); }
//       return res.json(200, data);
//     });
//     //return res.json(200, relpolvegs);
//   });
// };

// Get list of relpolvegs
exports.index = function(req, res) {
  Relpolveg.find(function (err, relpolvegs) {
    if(err) { return handleError(res, err); }
    return res.json(200, relpolvegs);
  });
};

// Get a single relpolveg
exports.show = function(req, res) {
  Relpolveg.findById(req.params.id, function (err, relpolveg) {
    if(err) { return handleError(res, err); }
    if(!relpolveg) { return res.send(404); }
    return res.json(relpolveg);
  });
};

// Creates a new relpolveg in the DB.
exports.create = function(req, res) {
  Relpolveg.create(req.body, function(err, relpolveg) {
    if(err) { return handleError(res, err); }
    return res.json(201, relpolveg);
  });
};

// Updates an existing relpolveg in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Relpolveg.findById(req.params.id, function (err, relpolveg) {
    if (err) { return handleError(res, err); }
    if(!relpolveg) { return res.send(404); }
    var updated = _.merge(relpolveg, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, relpolveg);
    });
  });
};

// Deletes a relpolveg from the DB.
exports.destroy = function(req, res) {
  Relpolveg.findById(req.params.id, function (err, relpolveg) {
    if(err) { return handleError(res, err); }
    if(!relpolveg) { return res.send(404); }
    relpolveg.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}