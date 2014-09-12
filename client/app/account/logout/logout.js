'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/logout', {
        templateUrl: 'app/account/logout/logout.html',
        controller: 'LogoutCtrl'
      });
  });
