'use strict';

angular.module('fullstack012App')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.mySlides = ['http://www.dibujos10.com/images/dibujos-perros-disney-pluto-p.jpg','http://www.dibujos10.com/images/dibujos-animados-perros-p.jpg'];

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
$scope.slides = [
  'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
  'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
  'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
  'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
];
  });