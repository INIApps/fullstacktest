'use strict';

angular.module('fullstack012App')
  .factory('MainData', function ($http, $q, Calculusservice) {
    var urlBase = '/api/flora';
    var dataFactory = {};

    dataFactory.getTransgenicasResume = function(){
      return $http.get(urlBase+'/transgenicas_r');
    };

    dataFactory.getCultivadasResume = function(){
      return $http.get(urlBase+'/cultivadas_r');
    };

    dataFactory.getMatch = function(spCompare){
      var deferred = $q.defer();
      $http.get(urlBase+'/relacion/'+spCompare.genero).success(function(data){
        //Proceso de cálculo y configuración del Array de objetos
        data = Calculusservice.setAndConfig(data,spCompare);        
        deferred.resolve(data);
      }).error(function(){
        deferred.reject("Ocurrió un error al buscar un match con la especie "+spCompare.taxa);
      });

      return deferred.promise;
    };

    return dataFactory;

  });