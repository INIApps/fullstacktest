'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/clasificacion-riesgo', {
        templateUrl: 'app/clasriesgo/clasriesgo.html',
        controller: 'ClasriesgoCtrl'
      });
  });
