'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tablas', {
        templateUrl: 'app/tablas/tablas.html',
        controller: 'TablasCtrl'
      });
  });
