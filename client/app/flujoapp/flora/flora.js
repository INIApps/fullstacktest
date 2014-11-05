'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/flora', {
        templateUrl: 'app/flora/flora.html',
        controller: 'FloraCtrl'
      })
      .when('/flora/:id', {
        templateUrl: 'app/flora/flora-show.html',
        controller: 'FloraCtrl'
      })
      .when('/flora/:id/edit', {
        templateUrl: 'app/flora/flora-edit.html',
        controller: 'FloraCtrl'
      });
  });
