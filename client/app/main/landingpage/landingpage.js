'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/landingpage', {
        templateUrl: 'app/main/landingpage/landingpage.html',
        controller: 'LandingpageCtrl'
      });
  });
