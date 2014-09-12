'use strict';

angular.module('fullstack012App')
  .controller('FloraCtrl', function ($scope,$http,$routeParams) {
	console.log('OK');
// Speed up calls to hasOwnProperty
//var hasOwnProperty = Object.prototype.hasOwnProperty;

// function isEmpty(obj) {

//     // null and undefined are "empty"
//     if (obj === null){
//     	return true;
//     }

//     // Assume if it has a length property with a non-zero value
//     // that that property is correct.
//     if (obj.length > 0){
//     	return false;
//     }
//     if (obj.length === 0){
//     	return true;
//     }

//     // Otherwise, does it have any properties of its own?
//     // Note that this doesn't handle
//     // toString and valueOf enumeration bugs in IE < 9
//     for (var key in obj) {
//         if (hasOwnProperty.call(obj, key)){
//         	return false;
//         }
//     }

//     return true;
// }

// if(isEmpty($routeParams)){
//   	Restangular.all('api/flora').getList().then(function(data){
//   		$scope.flora = data;
//   	});
// }else{
//   	Restangular.all('api/flora/').get($routeParams.id).then(function(data){
//   		$scope.singleSp = data;
//   		$scope.regiones = {};
//   		for (var i = data.dist.length - 1; i >= 0; i--) {
// 			if (data.dist[i].code === '01') {$scope.regiones.I = true; }
// 			if (data.dist[i].code === '02') {$scope.regiones.II = true; }
// 			if (data.dist[i].code === '03') {$scope.regiones.III = true; }
// 			if (data.dist[i].code === '04') {$scope.regiones.IV = true; }
// 			if (data.dist[i].code === '05') {$scope.regiones.V = true; }
// 			if (data.dist[i].code === '06') {$scope.regiones.VI = true; }
// 			if (data.dist[i].code === '07') {$scope.regiones.VII = true; }
// 			if (data.dist[i].code === '08') {$scope.regiones.VIII = true; }
// 			if (data.dist[i].code === '09') {$scope.regiones.IX = true; }
// 			if (data.dist[i].code === '10') {$scope.regiones.X = true; }
// 			if (data.dist[i].code === '11') {$scope.regiones.XI = true; }
// 			if (data.dist[i].code === '12') {$scope.regiones.XII = true; }
// 			if (data.dist[i].code === '13') {$scope.regiones.XIII = true; }
// 			if (data.dist[i].code === '14') {$scope.regiones.XIV = true; }
// 			if (data.dist[i].code === '15') {$scope.regiones.XV = true; }
//   		}
//   	});		
// }

	console.log($routeParams);

});
