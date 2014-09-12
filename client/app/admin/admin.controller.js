'use strict';

angular.module('fullstack012App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User,$location) {

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
    }).error(function(){
       $location.path('/login');
    });

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
