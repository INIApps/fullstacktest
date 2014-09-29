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
      $http.get(urlBase+'/relacion/'+spCompare.genero,{params: {spCompId: spCompare._id}})
        .success(function(data){
          //Proceso de cálculo y configuración del Array de objetos
          console.log('getMatch from frontend');
          data = Calculusservice.setAndConfig(data,spCompare);      
          deferred.resolve(data);
        })
        .error(function(){
          deferred.reject("Ocurrió un error al buscar un match con la especie "+spCompare.taxa);
        });

      return deferred.promise;
    };

    dataFactory.getPollinators = function(sp){
      var deferred = $q.defer();
      var idSpComp = sp.spCompare._id;
      var idSpSelected = sp._id;

      $http.get('/api/pollinator/relation/'+idSpComp+'/'+idSpSelected)
        .success(function(data){
            var answer = Calculusservice.pollinatorFx(data,sp);
            deferred.resolve(answer);
        })
        .error(function(){
          var answer = sp;
          deferred.reject("Ocurrió un error al buscar un match con polinizadores");
          console.log('Error en la llamada al servidor');
        });

      return deferred.promise;
    };

    dataFactory.getPollinatorsSingle = function(sp){
      var deferred = $q.defer();
      var idSpSelected = sp._id;
      var answer = sp;

      $http.get('/api/pollinator/single/'+idSpSelected)
        .success(function(data){
          answer.polSingle = Calculusservice.configPollinatorObj(data);
          console.log(answer);
          deferred.resolve(answer);
        })
        .error(function(){
          deferred.reject("Ocurrió un error al buscar un match con polinizadores");
          console.log('Error en la llamada al servidor');
        });

      return deferred.promise;
    };


    return dataFactory;
  });




