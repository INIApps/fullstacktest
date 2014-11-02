'use strict';

angular.module('fullstack012App')
  .controller('ModeladorCtrl', function ($scope,Vegetal, Spselected,$location) {
    if(Spselected.selected==null){
      $location.path('/flujoapp');
    }
    $scope.spSelected = Spselected.selected;
    var vegetales = new Vegetal();

    $scope.$watch('spSelected.R',function(data, old){
      var ecual = angular.equals(data, old);
      if($scope.spSelected && !ecual && $scope.spSelected.pollinators && $scope.spSelected.pollinators.list.length ){
        vegetales.pollinatorFxCalc($scope.spSelected);
      }
    },true);

  });
