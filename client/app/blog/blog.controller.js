'use strict';

angular.module('fullstack012App')
  .controller('BlogCtrl', function ($scope,$http) {
    $http.get('/api/blogs').success(function(data){
    	$scope.posts = data;
    });
    $http.jsonp('http://www.sanidadvegetal.cl/api/get_recent_posts?callback=JSON_CALLBACK').success(function(data){
    	$scope.sanidad = data;
    });
  });
