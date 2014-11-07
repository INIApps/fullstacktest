'use strict';

angular.module('SliderAngularJSModule', [])
  .controller('SliderAngularJSCtrl', function ($scope,$interval, $timeout) {

    // Set of Photos
    var photos = [
        {
          title:'Agromet', description:'Mas de 90 estaciones meteorológicas con información en tiempo real a tu disposición.',buttom:'Revisa el clima de tu zona',
            es:{title:'Agromet', description:'Mas de 90 estaciones meteorológicas con información en tiempo real a tu disposición.',buttom:'Revisa el clima de tu zona'},
            en:{title:'Agromet',description:'More than 90 weather stations with real-time at your disposal.',buttom:'Check the weather in your area'},
            src: 'http://2.bp.blogspot.com/-JouXSGJr31M/Tu-0u664XTI/AAAAAAAAAL8/1HHoFx1lPdA/s1600/skins_s2_002.jpg',
            alt: 'Estaciones meteorológicas automáticas'
        },
        {
          title:'Avispa-T', description:'Sistema de monitoreo on-line para controlar la avispa Chaqueta Amarilla. Te avisamos cuándo y cómo controlar esta plaga social',buttom:'Entra a la aplicación',
            es:{title:'Avispa-T', description:'Sistema de monitoreo on-line para controlar la avispa Chaqueta Amarilla. Te avisamos cuándo y cómo controlar esta plaga social',buttom:'Entra a la aplicación'},
            en:{title:'Avispa-T',description:'Monitoring system on-line to control the wasp. We will notify you when and how to control this social plague',buttom:'Get in the aplicaction'},
            src: 'http://1.bp.blogspot.com/-nOfq9_yCK30/TkUM72TVBVI/AAAAAAAAAuI/BRRX2VWwjkI/s1600/E4-Skins-Series-3-Power-Image-Wk-4-Jan09.jpg',
            alt: 'Image 02'
        }
    ];

    //$scope.photos = [];
    //angular.forEach(photos,function(data){
    //    $scope.photos.push(new mainObjct(data));
    //});
    //console.log($scope.photos);
    $scope.photos = photos;
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

});
