'use strict';

angular.module('fullstack012App')
  .factory('Vegetal', function ($http, $q, Florae) {

    function Vegetal(){
      this.name = 'prueba';
    }

    Vegetal.prototype = {
        getResume : function(string){
            var answer = [];
            if(string==='transgenicas'){
                return $http.get('api/flora/transgenicas_r').then(function(data){
                    var container = data.data;
                    for (var i = container.length - 1; i >= 0; i--) {
                        answer.push(new Florae(container[i]));
                    }
                    return answer;
                  //return data.data.map(Florae);
                });
            }
            if(string==='cultivadas'){
                return $http.get('api/flora/cultivadas_r').then(function(data){
                    var container = data.data;
                    for (var i = container.length - 1; i >= 0; i--) {
                        answer.push(new Florae(container[i]));
                    }
                    return answer;
                });
            }
        },
        getMatch : function(spCompare){
            var answer = {
                cultivadas : [],
                introducidas : [],
                nativas : [],
                list : []
            };
            return $http.get('api/flora/relacion/'+spCompare.genero,{params: {spCompId: spCompare._id}})
                .then(function(data){
                    var container = data.data;
                    angular.forEach(container,function(sp){
                        var newSp = new Florae(sp);
                        newSp.spCompare = spCompare;
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
                });
        },
        getPollinatorsSingle : function(sp){
            var deferred = $q.defer();
            var idSpSelected = sp._id;
            var answer = sp;
            var that = this;
            $http.get('/api/pollinator/single/'+idSpSelected)
                .success(function(data){
                    answer.polSingle = that.configPollinatorObj(data);
                    // console.log(answer);
                    deferred.resolve(answer);
                })
                .error(function(){
                    deferred.reject('Ocurrió un error al buscar un match con polinizadores');
                    console.log('Error en la llamada al servidor');
                });

            return deferred.promise;
        },
        getPollinators : function(sp){
            var deferred = $q.defer();
            var idSpComp = sp.spCompare._id;
            var idSpSelected = sp._id;
            var that = this;
            $http.get('/api/pollinator/relation/'+idSpComp+'/'+idSpSelected)
                .success(function(data){
                    var answer = that.pollinatorFx(data,sp);
                    deferred.resolve(answer);
                })
                .error(function(){
                    deferred.reject('Ocurrió un error al buscar un match con polinizadores');
                    console.log('Error en la llamada al servidor');
                });

            return deferred.promise;
        },
        pollinatorFx : function(data, sp){
            var pollinators =  this.configPollinatorObj(data);
            sp.pollinators = pollinators;
            if(data.length > 0){
                this.pollinatorFxCalc(sp);
            }
            return sp;
        },
        pollinatorFxCalc : function(sp){
            var H = 0;
            var D = 0;
            var C = 0;
            var L = 0;
            if(sp.pollinators.hymenoptera  > 0){ H =1;}
            if(sp.pollinators.lepidoptera  > 0){ L =1;}
            if(sp.pollinators.coleoptera > 0){ C =1;}
            if(sp.pollinators.diptera    > 0){ D =1;}
            var P = {
                fg : 4,
                ipG : 5,
                h : 5,
                d : 3,
                l : 4,
                c : 2
            };
            var ip = (H*P.h + D*P.d + C*P.c + L*P.l)/20;
            var fgOld = sp.flujoGenico()/100;
            var rest = 1-fgOld;
            var pondPol = 0.8;
            var cira = (fgOld + ip*rest*pondPol)*100;
            if(cira){sp.cira = cira;}
            return sp;
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
        }
    };

    return Vegetal;

  });
