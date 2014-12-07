'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/informe', {
        templateUrl: 'app/flujoapp/informe/informe.html',
        controller: 'InformeCtrl'
      });
  });
