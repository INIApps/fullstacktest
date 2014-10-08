'use strict';

angular.module('fullstack012App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/blog', {
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl'
      });
  });
