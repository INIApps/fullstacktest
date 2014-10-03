'use strict';

angular.module('fullstack012App')
  .factory('SpeciesEdit', function ($http) {

    var dataFactory = {};

    dataFactory.getFlora = function(id){
      return $http.get('api/flora/'+id);  
    };
    dataFactory.getPollinators = function(id){
      return $http.get('api/pollinator/single/'+id);  
    };
    dataFactory.pollinatorList = function(){
      return $http.get('api/pollinator');
    };
    dataFactory.savePollinator = function(veg,pol){
      return $http.put('api/pollinator/flora/'+pol, {'flora':veg})
        .success(function(){
          console.log('guardado');
        })
        .error(function(err){
          console.log('Ocurrió un error: '+err);
        });
    };
    dataFactory.pullFlorae = function(veg,pol){
      return $http.put('api/pollinator/flora/pull/'+pol, {'flora':veg})
        .success(function(){
          console.log('eliminado');
        })
        .error(function(err){
          console.log('Ocurrió un error: '+err);
        });
    };
    dataFactory.save = function(sp){
      $http.put('api/flora/'+sp._id,sp).success(function(){
        console.log('guardado');
      });
    };

    return dataFactory;

  });