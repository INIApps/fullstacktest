'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/escala-de-riesgo', {
        templateUrl: 'app/flujoapp/paginas/escalariesgo/escalariesgo.html',
        controller: 'EscalariesgoCtrl'
      });
  });
