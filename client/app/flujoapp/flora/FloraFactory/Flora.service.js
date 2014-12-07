'use strict';

angular.module('fullstack012App')
  .factory('Flora', function ($http, FloraeObj, FloraAPI, FloraTransform, $q) {
    return {
      getResumeTransgenicas : function(){
        var deferred = $q.defer();
        var value = deferred.promise.$object = [];
        FloraAPI.getTrangenicasResumen().then(function(data){
          angular.extend(value, data.map(FloraeObj.build));
          deferred.resolve(value);
        });
        return deferred.promise.$object;
          /*return FloraAPI.getTrangenicasResumen().then(function(data){
            return data.map(FloraeObj.build);
          });*/
      },
      getResumeCultivadas : function(){
        return FloraAPI.getCultivadasResumen().then(function(data){
          return data.map(FloraeObj.build);
        });
      },
      getMatch : function(spCompare){
        FloraeObj.prototype.spCompare = spCompare;

        return FloraAPI.getMatch(spCompare).then(function(data){
          return data.map(FloraeObj.build);
        }).then(function(data){
          return FloraTransform.filterGetMatch(data);
        });

      },
      getPollinatorsSingle : function(sp){
        return FloraAPI.getPollinatorsSingle(sp).then(function(data){
          return FloraTransform.configPollinatorObj(data);
        }).then(function(data){
          return  {polSingle: data};
        });
      },
      getPollinators: function(sp){
        return FloraAPI.getPollinators(sp)
          .then(function(data){
            return FloraTransform.configPollinatorObj(data);
        }).then(function(data){
            return  {pollinators: data};
        });
      },
      pollinatorFxCalc : function(data){
        if(data.pollinators.list.length === 0){ return false;}
        return FloraTransform.pollinatorFxCalc(data);
      }
    };

  });
