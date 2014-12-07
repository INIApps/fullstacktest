'use strict';

angular.module('fullstack012App')
  .controller('FlujoappCtrl', function ($scope,Flora, Spselected) {
    // variables que se ejecutan al cargar la página
    $scope.currentPage = 'app';
    $scope.admin = false;

    /**
     * Lista resumen de transgénicas
     */
    /*Flora.getResumeTransgenicas().then(function(data){
      $scope.transgenicas = data;
    });*/
    $scope.transgenicas = Flora.getResumeTransgenicas();

    Flora.getResumeCultivadas().then(function(data){
      $scope.cultivadas = data;
    });

    //funciones que ejecuta el usuario
    //selección de especie
    $scope.getMatch = function (spCompare){
      $scope.cleanVariables();
      $scope.spCompare = spCompare;

      Flora.getMatch(spCompare).then(function(data){
        //array de especies relacionadas
        $scope.especiesMatch = data;

      });
      Flora.getPollinatorsSingle(spCompare).then(function(data){
        //array de polinizadores relacionados
        angular.extend($scope.spCompare ,data);
      });
    };

    //selección de especie a comparar
    $scope.getReport = function (spSelected){
      Spselected.selected = spSelected;
      $scope.spSelected = spSelected;
      Flora.getPollinatorsSingle(spSelected).then(function(data){
        angular.extend($scope.spSelected ,data);
      });
      Flora.getPollinators(spSelected).then(function(data){
        angular.extend($scope.spSelected ,data);
        return data;
      }).then(function(data){
        $scope.spSelected.polFx = Flora.pollinatorFxCalc(data);
      });
    };


    //funciones utilitarias
    $scope.cleanVariables = function (){
      $scope.especiesMatch = false;
      $scope.spCompare = false;
      $scope.spSelected = false;
      $scope.taipo = false;
    };

  });
