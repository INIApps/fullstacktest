'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ponderacion', {
        templateUrl: 'app/ponderacion/ponderacion.html',
        controller: 'PonderacionCtrl'
      });
  });
