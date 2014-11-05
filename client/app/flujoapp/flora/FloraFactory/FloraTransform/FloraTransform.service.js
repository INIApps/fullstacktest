'use strict';

angular.module('fullstack012App')
  .factory('FloraTransform', function () {
    return {
      filterGetMatch: function (data) {
        var answer = {
          cultivadas : [],
          introducidas : [],
          nativas : [],
          list : []
        };
        angular.forEach(data,function(newSp){
          if(newSp.type!==4){
            answer.list.push(newSp);
          }
          switch(newSp.type){
            case 1:
              answer.cultivadas.push(newSp);
              break;
            case 2:
              answer.introducidas.push(newSp);
              break;
            case 3:
              answer.nativas.push(newSp);
              break;
          }
        });
        return answer;
      },
      configPollinatorObj : function(data){
        var pollinators = {};
        pollinators.list = data;
        pollinators.hymenoptera = 0;
        pollinators.lepidoptera = 0;
        pollinators.coleoptera = 0;
        pollinators.diptera = 0;

        angular.forEach(data,function(pol){
          switch (pol.orden){
            case 'Hymenoptera':
              pollinators.hymenoptera++;
              break;
            case 'Lepidoptera':
              pollinators.lepidoptera++;
              break;
            case 'Coleoptera':
              pollinators.coleoptera++;
              break;
            case 'Diptera':
              pollinators.diptera++;
              break;
          }
        });

        return pollinators;
      },
      pollinatorFxCalc : function(sp){
        //console.log('dentro de pollinatorFxCalc en FloraTransform');
        var H = 0;
        var D = 0;
        var C = 0;
        var L = 0;
        if(sp.pollinators.hymenoptera  > 0){ H =1;}
        if(sp.pollinators.lepidoptera  > 0){ L =1;}
        if(sp.pollinators.coleoptera > 0){ C =1;}
        if(sp.pollinators.diptera    > 0){ D =1;}

        var P = {h : 1, d : 0.6, l : 0.8 ,c : 0.2};

        return (H*P.h + D*P.d + C*P.c + L*P.l)*0.8/4;
      }
    };
  });
