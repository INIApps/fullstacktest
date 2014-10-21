'use strict';

angular.module('fullstack012App')
  .controller('FlujoappCtrl', function ($scope, Vegetal) {

        // variables que se ejecutan al cargar la página
        $scope.currentPage = 'flujoapp';
        $scope.admin = true;
        var vegetales = new Vegetal();

        vegetales.getResume('transgenicas').then(function(data){
            $scope.transgenicas = data;
        });
        vegetales.getResume('cultivadas').then(function(data){
            $scope.cultivadas = data;
        });

        //funciones que ejecuta el usuario
            //select box
        $scope.getMatch = function (spCompare){
            $scope.cleanVariables();
            vegetales.getMatch(spCompare).then(function(data){
                //array de especies relacionadas
                $scope.especiesMatch = data;
            });
            vegetales.getPollinatorsSingle(spCompare).then(function(data){
                //array de polinizadores relacionados
                $scope.spCompare = data;
            });
        };

        //selección de especie a comparar
        $scope.getReport = function (spSelected){
            vegetales.getPollinatorsSingle(spSelected).then(function(data){
                $scope.spSelected = data;
            });
            vegetales.getPollinators(spSelected).then(function(data){
                $scope.spSelected = data;
                console.log($scope.spSelected);
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