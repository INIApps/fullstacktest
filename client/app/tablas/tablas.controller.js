'use strict';

angular.module('fullstack012App')
  .controller('TablasCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $http.get('api/flora/transgenicas').success(function(data){
    	$scope.transgenicas = data;
    	$scope.pages = [];
	    for (var i = 0; i < data.pages; i++) {
	    	$scope.pages.push(i+1);
	    };
    });

    $scope.getPage = function (n){
    	$http.get('api/flora/transgenicas',{params:{'page':n}}).success(function(data){
    		$scope.transgenicas = data;
    	});
    };


  });
