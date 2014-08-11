'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/flora', {
        templateUrl: 'app/flora/flora.html',
        controller: 'FloraCtrl'
      });
  });
