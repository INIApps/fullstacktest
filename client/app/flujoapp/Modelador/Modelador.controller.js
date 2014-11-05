'use strict';

angular.module('fullstack012App')
  .controller('ModeladorCtrl', function ($scope, Spselected,$location) {
    if(Spselected.selected==null){
      $location.path('/flujoapp');
    }
    $scope.spSelected = Spselected.selected;

  });
