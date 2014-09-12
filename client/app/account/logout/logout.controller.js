'use strict';

angular.module('fullstack012App')
  .controller('LogoutCtrl', function ($scope, $location, Auth) {
	(function() {
	  Auth.logout();
	  $location.path('/login');
	})();
  });
