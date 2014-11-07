'use strict';

angular.module('NavbarThemeModule', [])
  .controller('navbarTheme', function ($scope, $location, Auth) {
    $scope.logo1 = 'assets/images/inia/logo-conicyt.jpg';
    $scope.logo2 = 'assets/images/inia/logo-inia.jpg';
    $scope.linkLogo = 'http://flujogenico.cl';
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    // $scope.logout = function() {
    //   Auth.logout();
    //   $location.path('/login');
    // };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    //Navbar items
    $scope.menu = [
      {'title': 'Proyecto', 'link': '#','id':'proyecto', 'subMenu':[
         {'title':'Bases','link':'/','id':'bases'},
         {'title':'Guía electronica','link':'/','id':'guia'},
         {'title':'Sistema de modelamiento','link':'/'},
      ]},
      {'title': 'Aplicación', 'link': '/flujoapp','id':'flujoapp'},
      {'title': 'Noticias', 'link': 'seccion-noticias','id':'news'},
      {'title': 'Grupo', 'link': '/','id':'group'},
      {'title': 'Contacto', 'link': '/','id':'contacto'},
      {'title': 'Usuarios', 'link': '#','id':'interno', 'subMenu':[
         {'title': 'Login', 'link': '/login','id':'login'},
         {'title': 'Logout', 'link': '/logout','id':'logout'},
         {'title': 'Settings', 'link': '/settings','id':'settings'},
         {'title': 'Admin', 'link': '/admin','id':'admin'},
         {'title': 'Registrarse', 'link': '/signup','id':'signup'}
      ]}
    ];
    //$scope.hascdcd = angular.element('#header').hasClass('sticky');

  });
