'use strict';

angular.module('fullstack012App')
  .controller('TablasCtrl', function ($scope,$http) {

  	function unSetDataScope(){
  		$scope.transgenicas = false;
  		$scope.cultivadas = false;
  		$scope.introducidas = false;
  		$scope.nativas = false;
  		$scope.polinizadores = false;
  	}

    $scope.getPage = function (n){
    	if($scope.typeSp === 'polinizadores'){
			$http.get('api/pollinator/paginado',{params:{'page':n}}).success(function(dt){
				 $scope.polinizadores = dt;
			});
    	}else{
	    	$http.get('api/flora/'+ $scope.typeSp,{params:{'page':n}}).success(function(data){
	    		switch($scope.typeSp){
			    	case 'transgenicas':
			    		$scope.transgenicas = data;
			    		break;
			    	case 'cultivadas':
			    		$scope.cultivadas = data;
			    		break;
			    	case 'introducidas':
			    		$scope.introducidas = data;
			    		break;
			    	case 'nativas':
			    		$scope.nativas = data;
			    		break;
			    }
	    	});
	    }
    };

    $scope.getSp = function(type){
    	$scope.typeSp = type;
	    $http.get('api/flora/'+type).success(function(data){
	    	$scope.pages = [];
		    for (var i = 0; i < data.pages; i++) {
		    	$scope.pages.push(i+1);
		    }
		    unSetDataScope();
		    switch(type){
		    	case 'transgenicas':
		    		$scope.transgenicas = data;
		    		break;
		    	case 'cultivadas':
		    		$scope.cultivadas = data;
		    		break;
		    	case 'introducidas':
		    		$scope.introducidas = data;
		    		break;
		    	case 'nativas':
		    		$scope.nativas = data;
		    		break;
		    }
	    });
    };

    $scope.getSpPol = function(){
    	$scope.typeSp = 'polinizadores';
    	unSetDataScope();
	    $http.get('api/pollinator/paginado').success(function(data){
	    	$scope.pages = [];
		    for (var i = 0; i < data.pages; i++) {
		    	$scope.pages.push(i+1);
		    }
		    unSetDataScope();
		    $scope.polinizadores = data;
	    });
    };

    $scope.getSp('transgenicas');
  });
