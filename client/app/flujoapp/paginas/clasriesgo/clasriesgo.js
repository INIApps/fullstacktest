'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/clasificacion-riesgo', {
        templateUrl: 'app/flujoapp/paginas/clasriesgo/clasriesgo.html',
        controller: 'ClasriesgoCtrl'
      });
  });
