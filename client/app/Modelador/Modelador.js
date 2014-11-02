'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/modelador', {
        templateUrl: 'app/Modelador/Modelador.html',
        controller: 'ModeladorCtrl'
      });
  });
