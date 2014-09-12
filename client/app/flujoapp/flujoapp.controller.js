'use strict';

angular.module('fullstack012App')
  .controller('FlujoappCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.awesomeThings = [];

    $http.get('/api/transgenicos').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/transgenicos', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/transgenicos/' + thing._id);
    };

  });
