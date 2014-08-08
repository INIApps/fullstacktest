'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/flujoapp', {
        templateUrl: 'app/flujoapp/flujoapp.html',
        controller: 'FlujoappCtrl'
      });
  });
