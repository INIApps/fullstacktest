'use strict';

angular.module('fullstack012App').controller('FlujoappCtrl', function ($scope, $http, MainData) {

$scope.currentPage = 'flujoapp';
$scope.spSelected = null;

MainData.getTransgenicasResume().success(function(data) {
  $scope.transgenicas = data;
  $scope.people = data;
});

MainData.getCultivadasResume().success(function(data) {
  $scope.cultivadas = data;
});

$scope.getMatch = function (spCompare){
  MainData.getMatch(spCompare).then(function(data){
    $scope.especiesMatch = data;
    // console.log(data);
  });
};

$scope.getReport = function (sp){
  $scope.spSelected = sp;
};

});

