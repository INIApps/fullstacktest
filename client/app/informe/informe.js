'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/informe', {
        templateUrl: 'app/informe/informe.html',
        controller: 'InformeCtrl'
      });
  });
