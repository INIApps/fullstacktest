'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/sistema-computacional', {
        templateUrl: 'app/flujoapp/paginas/sistemacompu/sistemacompu.html',
        controller: 'SistemacompuCtrl'
      });
  });
