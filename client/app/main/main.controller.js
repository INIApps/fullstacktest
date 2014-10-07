'use strict';

angular.module('fullstack012App')
.controller('MainCtrl', function ($scope) {
  $scope.currentPage = 'home';
  $scope.members1 = [
    {name:'Humberto Prieto',position:'Director',imgUrl:'assets/images/inia/humberto_prieto.jpg', altImg:'Humberto Prieto, director del proyecto Flujo génico'},
    {name:'Érika Salazar',position:'Directora Alterna',imgUrl:'assets/images/inia/erika_salazar.jpg', altImg:''},
    {name:'Gustavo Chacón',position:'Encargado de Tecnologías de la Información y Comunicaciones (TICs)',imgUrl:'assets/images/inia/gustavo_chacon.jpg', altImg:''}
  ];
  $scope.members2 = [
    {name:'Pablo Cid',position:'Encargado de Desarrollo de aplicación y base de datos de fauna entomológica',imgUrl:'assets/images/inia/pablo_cid.jpg', altImg:'Agroinformático'},
    {name:'Humberto Navarrete',position:'Apoyo en confección y actualización de la base de datos con información entomológica.',imgUrl:'assets/images/inia/humberto_navarrete.jpg', altImg:'Ingeniero Agrónomo Humberto Simón Navarrete Jeldres'},
    {name:'Carlos Aguirre',position:'Apoyo en desarrollo de aplicación',imgUrl:'assets/images/inia/carlos_aguirre.jpg', altImg:'Bioquímico'},
  ];

  // $http.get('http://www.sanidadvegetal.cl/api/get_recent_posts/').success(function(data){
  //   $scope.sanidadvegetal = data;
  // });
  
});