'use strict';

angular.module('fullstack012App')
  .directive('sliderPC', function () {
    return {
      templateUrl: 'app/commons/directives/sliderPC/sliderPC.html',
      restrict: 'A',
      scope:{
        photos:'=slideData'
      },
      controller:function($scope,$interval, $timeout){

        //$scope.photos = slideData;
        // initial image index
        $scope._Index = 0;

        // if a current image is the same as requested image
        $scope.isActive = function (index) {
          return $scope._Index === index;
        };

        // show prev image
        $scope.showPrev = function () {
          $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
        };

        // show next image
        $scope.showNext = function () {
          $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
        };

        // show a certain image
        $scope.showPhoto = function (index) {
          $scope._Index = index;
        };
        var intervalo = false;

        $scope.intervaloActive = function(){
          intervalo = $interval($scope.showNext,5000);
        };
        $scope.intervaloActive();

        $scope.intervaloCancel = function(){
          $interval.cancel(intervalo);
        };

        $scope.swipeWait = function(){
          $scope.intervaloCancel();
          $timeout($scope.intervaloActive(),5000);
        };
      },
      link: function (scope, element, attrs) {
      }
    };
  });
