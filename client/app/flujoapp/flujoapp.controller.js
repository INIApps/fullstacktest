'use strict';

angular.module('fullstack012App')
  .controller('FlujoappCtrl', function ($scope,$http, MainData, Vegetal) {
    $scope.currentPage = 'flujoapp';

    var vegetales = new Vegetal();

    vegetales.getResume('transgenicas').then(function(data){
      $scope.transgenicas = data;
    });

    vegetales.getResume('cultivadas').then(function(data){
      $scope.cultivadas = data;
    });

    $scope.viewPollinators = function(sp){

      $http.get('/api/pollinator/single/'+sp._id).then(function(data){
        // console.log(data);
      });
    };

    $scope.getMatch = function (spCompare){
      $scope.especiesMatch = false;
      $scope.spCompare = false;
      $scope.taipo = false;
      vegetales.getMatch(spCompare).then(function(data){
        $scope.especiesMatch = data;
      });
      vegetales.getPollinatorsSingle(spCompare).then(function(data){
        $scope.spCompare = data;
      });
    };

    $scope.getReport = function (spSelected){
      vegetales.getPollinators(spSelected).then(function(data){
        $scope.spSelected = data;
      });
      vegetales.getPollinatorsSingle(spSelected).then(function(data){
        $scope.spSelected = data;
      });
    };

    $scope.cleanVariables = function (){
      $scope.especiesMatch = false;
      $scope.spCompare = false;
      $scope.spSelected = false;
      $scope.taipo = false;
    };


  });