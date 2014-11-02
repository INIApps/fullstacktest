'use strict';

angular.module('fullstack012App')
  .controller('FlujoappCtrl', function ($scope, Vegetal,Spselected) {

        // variables que se ejecutan al cargar la página
        $scope.currentPage = 'app';
        $scope.admin = false;
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
                Spselected.selected = data;

            });
          console.log(spSelected._id);
        };

        $scope.$watch('spSelected.R',function(data, old){
            var ecual = angular.equals(data, old);
            if($scope.spSelected && !ecual && $scope.spSelected.pollinators && $scope.spSelected.pollinators.list.length ){
                vegetales.pollinatorFxCalc($scope.spSelected);
            }
        },true);

        //funciones utilitarias
        $scope.cleanVariables = function (){
            $scope.especiesMatch = false;
            $scope.spCompare = false;
            $scope.spSelected = false;
            $scope.taipo = false;
        };
    $scope.panels = [
      {
        "title": "Collapsible Group Item #1",
        "body": "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
      },
      {
        "title": "Collapsible Group Item #2",
        "body": "Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
      },
      {
        "title": "Collapsible Group Item #3",
        "body": "Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade."
      },
      {
        "title": "Collapsible Group Item #4",
        "body": "Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid."
      }
    ];
    $scope.panels.activePanel = 1;

  });
