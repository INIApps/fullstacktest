'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/base-de-datos', {
        templateUrl: 'app/flujoapp/paginas/db/db.html',
        controller: 'DbCtrl'
      });
  });
