'use strict';

angular.module('fullstack012App')
  .controller('FlujoappCtrl', function ($scope, $http, MainData) {
    $scope.currentPage = 'flujoapp';

    MainData.getTransgenicasResume().success(function(data) {
      $scope.transgenicas = data;
      $scope.people = data;
    });

    MainData.getCultivadasResume().success(function(data) {
      $scope.cultivadas = data;
    });

    $scope.getMatch = function (spCompare){
      MainData.getMatch(spCompare).then(function(data){
        //console.log(data);
        $scope.especiesMatch = data;
      });
      MainData.getPollinatorsSingle(spCompare).then(function(data){
        $scope.spCompare = data;
      });
    };

    $scope.getReport = function (spSelected){
      MainData.getPollinators(spSelected).then(function(data){
        $scope.spSelected = data;
      });
      MainData.getPollinatorsSingle(spSelected).then(function(data){
        $scope.spSelected = data;
      });
    };
  });