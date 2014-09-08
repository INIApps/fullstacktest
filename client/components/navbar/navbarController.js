'use strict';

angular.module('NavbarModule', [])
.controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.logo1 = 'assets/images/inia/logo-conicyt.jpg';
    $scope.logo2 = 'assets/images/inia/logo-inia.jpg';
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
    $scope.menu = [
      {'title': 'Home', 'link': '/','id':'home'},
      {'title': 'Proyecto', 'link': '#','id':'proyecto', 'subMenu':[
        {'title':'Bases','link':'/','id':'bases'},
        {'title':'Guía electronica','link':'/','id':'guia'},
        {'title':'Sistema de modelamiento','link':'/'},
      ]},
      {'title': 'Aplicación', 'link': '/flujoapp','id':'flujoapp'},
      {'title': 'Noticias', 'link': 'seccion-noticias','id':'news'},
      {'title': 'Grupo', 'link': '/','id':'group'},
      {'title': 'Contacto', 'link': '/','id':'contacto'},
      {'title': 'Login', 'link': '/','id':'login'},
      ];
  })
.directive('toggleOpen',function(){
  var directive = {};
  directive.restrict = 'A';
  directive.link = function(scope,element){
    
    element.bind('click',function($event){
      if(element.hasClass('dropdown')){
        $event.preventDefault();
        element.toggleClass('open');
      }
    });
    element.on('mouseleave',function(){
      if(element.hasClass('dropdown')&& element.hasClass('open')){
        element.toggleClass('open');
      }
    });
  };
  return directive;
});