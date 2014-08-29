'use strict';

angular.module('fullstack012App')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    // $scope.menu = [{
    //   'title': 'Home',
    //   'link': '/'
    // }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    //Navbar variables
    $scope.logoUrl = 'inia/logo-inia.jpg';
      $scope.menu = [
      {'title': 'Home', 'link': 'seccion-noticias','active':true},
      {'title': 'Proyecto', 'link': '/','active':false, 'subMenu':[
        {'title':'Bases','link':'/'},
        {'title':'Guía electronica','link':'/'},
        {'title':'Sistema de modelamiento','link':'/'},
      ]},
      {'title': 'Noticias', 'link': 'seccion-noticias','active':false},
      {'title': 'Grupo', 'link': '/','active':false},
      {'title': 'Contacto', 'link': '/','active':false},
      {'title': 'Login', 'link': '/','active':false}
      ];
  });