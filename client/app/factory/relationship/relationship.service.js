'use strict';

angular.module('fullstack012App')
  .factory('relationship', function ($http,$q) {
    // Service logic

    // Public API here
    return {
      getMatchPerGenus: function (genero) {
        var deferred = $q.defer();
        $http.get('/api/flora/relacion/'+genero)
        .success(function(data, status, headers, config) {
           deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
           deferred.reject(status);
        });
        return deferred.promise;
      },
      getMultiple : function(ArrayKrap){
        var deferred = $q.defer();
        var urlArray = [];
        for (var i = ArrayKrap.length - 1; i >= 0; i--) {
          urlArray.push($http.get('/api/flora/relacion/'+ ArrayKrap[i] ));
        }
        $q.all(urlArray)
          .then(function(result) {
            var tmp = [];
            angular.forEach(result, function(response) {
              tmp.push(response.data);
            });
            console.log(tmp);
            return result;
          })
          .then(function(tmpResult) {
            deferred.resolve(tmpResult);
          }, function(){
            deferred.reject('No pasa nah');
          });
        return deferred.promise;
      }
    };
  });