'use strict';

angular.module('fullstack012App')
  .controller('FloraCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $http.get('/api/flora').success(function(data) {
      $scope.flora = data;
    });
  });
