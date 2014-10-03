'use strict';

angular.module('fullstack012App')
  .controller('FloraCtrl', function ($scope,$routeParams, SpeciesEdit, $window) {

  SpeciesEdit.getFlora($routeParams.id).then(function(data){
    $scope.singleSp = data.data;
  });
  SpeciesEdit.getPollinators($routeParams.id).then(function(data){
    $scope.pollinators = data.data;
  });

  $scope.editThis = function(sp, key){
    $scope.modal = true;
    $scope.spEdit = sp;
    $scope.spKey = key;
    $scope.spValue = sp[key];
  };

  $scope.dismis = function(){
    $scope.modal = false;
    $scope.spEdit = false;
    $scope.spKey = false;
    $scope.spValue = false;
  };

  $scope.save = function(key, newValue){
    if($scope.singleSp[key] !== newValue && key !=='_id'){
      $scope.ifChange = true;
      $scope.singleSp[key] = newValue;
      //console.log(newValue);
        console.log('OK  pre-save');
    }else if($scope.singleSp[key] === newValue){
      // alert('No existen cambios');
    }else{
      //alert('No se puede modificar el ID');
    }
    $scope.dismis();
  };

  $scope.saveToDB = function(){
    SpeciesEdit.save($scope.singleSp);
    console.log('OK, save to the DB');
    $window.location.reload();
  };

  $scope.addPollinator = function(){
    SpeciesEdit.pollinatorList().then(function(data){
      $scope.pollinatorList = data.data;
    });
  };

  $scope.savePollinator = function(){
    var idPol = $scope.newPollinator._id;
    var idVeg = $scope.singleSp._id;
    SpeciesEdit.savePollinator(idVeg,idPol);
    $window.location.reload();
  };

  $scope.deleteFlora = function(id){
    var idPol = id;
    var idVeg = $scope.singleSp._id;
    SpeciesEdit.pullFlorae(idVeg,idPol).then(function(){
      console.log('OK, borrado el vegetal');
      $window.location.reload();
    });
  };
});