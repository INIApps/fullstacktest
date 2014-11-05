'use strict';

angular.module('fullstack012App')
  .factory('FloraAPI', function ($http) {
    var FloraAPI = {};

    FloraAPI.getTrangenicasResumen = function(){
      return $http.get('api/flora/transgenicas_r',{cache:true}).then(function(data){
        return data.data;
      });

    };
    FloraAPI.getCultivadasResumen =  function(){
      return $http.get('api/flora/cultivadas_r',{cache:true}).then(function(data){
        return data.data;
      });
    };
    FloraAPI.getMatch = function(sp){
      return $http.get('api/flora/relacion/'+sp.genero,{params: {spCompId: sp._id}}).then(function(data){
        return data.data;
      });
    };
    FloraAPI.getPollinatorsSingle = function(sp){
      return $http.get('/api/pollinator/single/'+sp._id).then(function(data){
        return data.data;
      });
    };
    FloraAPI.getPollinators = function(sp){
        return $http.get('/api/pollinator/relation/'+sp.spCompare._id+'/'+sp._id)
          .then(function(data){
            return data.data;
          });
    };

    return FloraAPI;

  });
