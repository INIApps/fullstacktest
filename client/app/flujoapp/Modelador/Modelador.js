'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/modelador', {
        templateUrl: 'app/flujoapp/Modelador/Modelador.html',
        controller: 'ModeladorCtrl'
      });
  });
