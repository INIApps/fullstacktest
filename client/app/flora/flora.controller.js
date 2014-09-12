'use strict';

angular.module('fullstack012App')
  .controller('FloraCtrl', function ($scope,$http,$routeParams) {

$scope.getGenus = function (familia){
  $http.get('/api/flora/filter/genero/'+familia).success(function(data){
    $scope.generos = data;
  });
};

$scope.getRelated = function (genero){
  $http.get('/api/flora/filter/related/'+genero).success(function(data){
    $scope.spRelated = data;
  });
};

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj === null){
      return true;
    }

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0){
      return false;
    }
    if (obj.length === 0){
      return true;
    }

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)){
          return false;
        }
    }

    return true;
}

if(isEmpty($routeParams)){
  $http.get('/api/flora/filter/familia').success(function(data){
    $scope.familias = data;
  });
}else{
    $http.get('api/flora/'+$routeParams.id).success(function(data){
      $scope.singleSp = data;
    });   
}

});