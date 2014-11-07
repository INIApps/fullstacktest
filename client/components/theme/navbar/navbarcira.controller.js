'use strict';

angular.module('NavbarThemeModuleCira', [])
  .controller('NavbarCiraCtrl', function ($scope, $location, Auth) {
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
    //Navbar variables
    $scope.menu = [
      {'title': 'Inicio', 'link': '/','id':'home'},
      {'title': 'Bases de datos', 'link': '/base-de-datos','id':'tablas'},
      {'title': 'Sistema computacional', 'link': '/sistema-computacional','id':'sistema'},
      {'title': 'Clasificación de riesgo', 'link': '/clasificacion-riesgo','id':'riesgo'},
      {'title': 'Escala de riesgo', 'link': '/escala-de-riesgo','id':'escala'},
      {'title': 'Ir a la aplicación', 'link': '/flujoapp','id':'app'},
    ];
  });
