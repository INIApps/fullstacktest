'use strict';

angular.module('fullstack012App').controller('FlujoappCtrl', function ($scope, $http) {

$http.get('/api/flora/transgenicas_r').success(function(awesomeThings) {
  $scope.transgenicas = awesomeThings;
});

$http.get('/api/flora/cultivadas_r').success(function(awesomeThings) {
  $scope.cultivadas = awesomeThings;
});

$scope.getMatch = function (){
  $http.get('/api/flora/relacion/'+$scope.spCompare.genero).success(function(data){
    //$scope.especieSeleccionada = sp;
    $scope.especiesMatch = data;
  });
};

$scope.getReport = function (sp){
  $scope.report = '';
  $scope.report = sp;
  $scope.riesgo = '';
  $scope.riesgo = $scope.FlujoGenico(sp);
  $scope.descriptionShow = '';
  $scope.descriptionShow = $scope.description(sp);
};

//Objeto con las ponderaciones
var Re = {
  CtipO:  1,
  Cen:  6,
  Cnati:  5,
  Cin:  2,
  Cnatu:  4,
  CtipC:  1,
  Cag:  3,
  Cor:  2,
  Cfo:  2,
  Cma:  6,
  CtipR:  1,
  Cse:  4,
  Cve:  5,
  Ccv:  1,
  Can:  4,
  Cbi:  4,
  Cpe:  3,
  Cbu:  3,
  CtipP:  1,
  Cang:   2,
  Calg:   5,
  CagP:   1,
  Cent:   4,
  Cane:   3,
  Cart:   2,
  Cland:  1,
  Clan:   5,
  Itipoc :  1,
  Ia :  3,
  Io :  2,
  If :  2,
  Ime : 3,
  Ima : 6,
  Iotr :1,
  In :  5,
  NcEc :1,
  Nex :2,
  Np :6,
  Nv :5,
  Nr :4,
  Notr :1,
  Nen :3
};

$scope.R = Re;

$scope.FlujoGenico = function (sp){
  if($scope.spCompare.type===4){ $scope.resultFlujoGenico = $scope.FlujoGenicoTransgenico(sp); }
  if($scope.spCompare.type===1){ $scope.resultFlujoGenico = $scope.FlujoGenicoCultivadas(sp); }

  return $scope.resultFlujoGenico;
};

$scope.FlujoGenicoTransgenico = function (sp){
  if(sp.type===1){ $scope.resultFlujoGenicoTransgenico = $scope.rasC(sp); }
  if(sp.type===2){ $scope.resultFlujoGenicoTransgenico = $scope.rasI(sp); }
  if(sp.type===3){ $scope.resultFlujoGenicoTransgenico = $scope.rasN(sp); }

  $scope.resultFlujoGenicoTransgenico = $scope.resultFlujoGenicoTransgenico * $scope.spCompare.flujo;

  if($scope.spCompare.especie === sp.especie || $scope.spCompare.taxa === sp.taxa){ $scope.resultFlujoGenicoTransgenico +=50; }
  
  return $scope.resultFlujoGenicoTransgenico;
};

$scope.FlujoGenicoCultivadas = function (sp){
  if(sp.type===1){ $scope.resultFlujoGenicoCultivo = $scope.rasC(sp); }
  if(sp.type===2){ $scope.resultFlujoGenicoCultivo = $scope.rasI(sp); }
  if(sp.type===3){ $scope.resultFlujoGenicoCultivo = $scope.rasN(sp); }

  if($scope.spCompare.especie === sp.especie || $scope.spCompare.taxa === sp.taxa){ $scope.resultFlujoGenicoCultivo +=50; }
  
  return $scope.resultFlujoGenicoCultivo;
};

$scope.rasC = function(sp){
  //$scope.SumaC = ($scope.R.CtipC+ ($scope.R.CtipO*2)+ $scope.R.CtipP + $scope.R.CtipR + $scope.R.Ccv + $scope.R.Cland + $scope.R.CagP )/8 ;
  $scope.SumaC = 1;

    $scope.riesgoC = (
        $scope.R.Cen*sp.endemico + 
        $scope.R.Cnati*sp.nativo + 
        $scope.R.Cin*sp.introducido + 
        $scope.R.Cnatu*sp.naturalizado) * $scope.R.CtipO;                  
    
    $scope.riesgoC += (
        $scope.R.Cag*sp.agricola + 
        $scope.R.Cor*sp.ornamental + 
        $scope.R.Cfo*sp.forestal + 
        $scope.R.Cma*sp.maleza) * $scope.R.CtipC;

    $scope.riesgoC += (
        $scope.R.Clan*sp.landrace) * $scope.R.Cland;

    $scope.riesgoC += (
        $scope.R.Cse*sp.semilla + 
        $scope.R.Cve*sp.vegetativa) * $scope.R.CtipR;
    
    $scope.riesgoC += (
        $scope.R.Can*sp.anual + 
        $scope.R.Cbi*sp.bianual + 
        $scope.R.Cpe*sp.perenne + 
        $scope.R.Cbu*sp.bulbosa) * $scope.R.Ccv;
    
    $scope.riesgoC += (
        $scope.R.Calg*sp.alogama + 
        $scope.R.Cang*sp.autogama) * $scope.R.CtipP;
    
    $scope.riesgoC += (
        $scope.R.Cent*sp.entomofila + 
        $scope.R.Cane* sp.anemofila + 
        $scope.R.Cart*sp.artificial) * $scope.R.CagP;
    
   return $scope.riesgoC/(576 * $scope.SumaC)*100;
};
$scope.rasI = function(sp){
  //$scope.SumaI = ($scope.R.Itipoc + $scope.R.Iotr)/2 ;
  $scope.SumaI = 1 ;

  $scope.riesgoI  = (
    $scope.R.Ia*sp.agricola + 
    $scope.R.If*sp.forestal + 
    $scope.R.Ima*sp.maleza + 
    $scope.R.Io*sp.ornamental + 
    $scope.R.Ime*sp.medicinal) * $scope.R.Itipoc;

  $scope.riesgoI += (
    $scope.R.In * sp.naturalizada) * $scope.R.Iotr;
  $scope.riesgoI = $scope.riesgoI/( 216 * $scope.SumaI)*100;
  return $scope.riesgoI;
};
$scope.rasN = function(sp){
  //$scope.SumaN  = ($scope.R.NcEc + $scope.R.Notr)/2;
  $scope.SumaN  = 1;
  
  $scope.riesgoN  = (
    $scope.R.Np  *  sp.enPeligro   + 
    $scope.R.Nex *  sp.extinta  + 
    $scope.R.Nr  *  sp.rara   + 
    $scope.R.Nv  *  sp.vulnerable ) * $scope.R.NcEc;

  $scope.riesgoN += $scope.R.Nen * sp.endemica * $scope.R.Notr;

  $scope.riesgoN = $scope.riesgoN /( 144 * $scope.SumaN ) * 100;

  //return  $scope.riesgoN / (144 * $scope.R.SumaN) * 100;
  return $scope.riesgoN;
};
$scope.riskLevel = function(flujo){
  if(flujo < 33.3333){
    return 'Bajo';
  }
  if(flujo >=33.3333 && flujo< 66.6666){
    return 'Medio';
  }
  if(flujo >= 66.6666){
    return 'Alto';
  }
};

$scope.description = function(sp){
  var descripcion =  sp.taxa;
  if(sp.nameEs.length > 0 && sp.nameEs[0].name){ 
    descripcion += ' (nombre común: '+ sp.nameEs[0].name + ')'; 
  }else if (sp.nameEs){
    descripcion += ' (nombre común: '+ sp.nameEs + ')';
  }
   
   descripcion +=' pertenece a la familia '+ sp.familia;

  if(sp.type===1){
    //tipo origen
    if(sp.nativo===1 && sp.endemico===1){ 
      descripcion +=' y corresponde a una especie nativa y endémica de Chile. ' ;
    }else if(sp.endemico===1){ 
      descripcion +=' y corresponde a una especie de origen endémica en Chile. '; 
    }else if(sp.nativo===1){ 
      descripcion +=' y corresponde a una especie nativa de Chile. ';
    }else if(sp.introducido ===1 && sp.naturalizado ===1){
      descripcion +=' y corresponde a una especie introducida y naturalizada en Chile. ';
    }else if(sp.introducido ===1){
      descripcion +=' y corresponde a una especie introducida en Chile. ';
    }else if(sp.naturalizado ===1){
      descripcion +=' y corresponde a una especie naturalizada en Chile. ';
    }else{
      descripcion +='.';
    }

    //ciclo de vida
    if(sp.anual===1 && sp.bianual===1 &&  sp.bulbosa===1){descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual y bianual';}
    else if(sp.anual===1 && sp.bianual===1)      {descripcion +='Respecto a su biología, presenta un ciclo de vida anual y bianual';}
    else if(sp.bianual===1 && sp.anual===1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual';}
    else if(sp.bianual===1 && sp.bulbosa===1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida bianual';}
    else if(sp.anual===1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida anual';}
    else if(sp.bianual===1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida bianual';}
    else if(sp.perenne===1 && sp.bulbosa===1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida perenne';}
    else if(sp.perenne===1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida perenne';}
    else if(sp.bulbosa===1)                   {descripcion +='Respecto a su biología, es una especie bulbosa';}
    else if(sp.semilla===1 || sp.vegetativa===1)      {descripcion +='Respecto a su biología, es una especie';}

    //tipo de reproducción
    if(sp.semilla===1 && sp.vegetativa===1)           {descripcion +=' con reproducción sexual y vegetativa';}
    else if(sp.semilla===1)                   {descripcion +=' con reproducción sexual';}
    else if(sp.vegetativa===1)                   {descripcion +=' con reproducción vegetativa';}

    //tipo polinizacion
    if (sp.autogama===0 && sp.alogama===0)        {descripcion +='.';}
    else if(sp.autogama===1)                  {descripcion +=' y tipo de polinización autógama.';}
    else if(sp.alogama===1){
     if(sp.entomofila===1&&sp.artificial===1)      {descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila), además de polinización artificial en sistemas productivos.';}
     else if(sp.anemofila===1&&sp.artificial===1) {descripcion +=' y tipo de polinización alógama realizada por viento (anemófila), además de polinización artificial en sistemas productivos.';}
     else if(sp.anemofila===1)             {descripcion +=' y tipo de polinización alógama realizada por viento (anemófila).';}
     else if(sp.entomofila===1)             {descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila).';}
     else if(sp.artificial===1)             {descripcion +=' y tipo de polinización alógama realizada de forma artificial en sistemas productivos.';}
     else                            {descripcion +='.';}
    }

    //tipo de especie
    if(sp.agricola===1 && sp.ornamental===1 && sp.maleza===1) {descripcion +='En el área productiva, es una especie de importancia agrícola, ornamental y como maleza.';}
    else if(sp.agricola===1 && sp.maleza===1) {descripcion +='En el área productiva, es una especie de importancia agrícola y como maleza.';}
    else if(sp.ornamental===1 && sp.maleza===1) {descripcion +='En el área productiva, es una especie de importancia ornamental y como maleza.';}
    else if(sp.maleza===1)               {descripcion +='En el área productiva, esta especie se comporta como maleza.';}
    else if(sp.forestal===1)               {descripcion +='En el área productiva, es una especie de importancia forestal.';}
  }//END... if(sp.type==1){

  if(sp.type===2){
    //2.     Naturalizada
    var naturalizada ='';
    if(sp.In===1){
      naturalizada ='naturalizada';
    }

    //1.     Tipo de especie
    if(sp.agricola===1 && sp.ornamental===1 && sp.maleza===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola, ornamental y como maleza';
    }else if(sp.agricola===1 && sp.maleza===1 && sp.medicinal===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y como maleza, además de su uso medicinal';
    }else if(sp.agricola===1 && sp.maleza===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y como maleza';
    }else if(sp.ornamental===1 && sp.maleza===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia ornamental y como maleza';
    }else if(sp.agricola===1 && sp.medicinal===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y uso medicinal';
    }else if(sp.agricola===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola';
    }else if(sp.medicinal===1){
      descripcion +='. En el área productiva, esta especie '+naturalizada+' se comporta como maleza';
    }else if(sp.forestal===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia forestal';
    }else if(sp.maleza===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de uso medicinal';
    }else if(sp.ornamental===1){
      descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia ornamental';
    }
    descripcion +='.';
  }//END... if(sp.type===2){

  if(sp.type===3){
    //2.     Endémica
    if(sp.endemica===1){
      descripcion +=' y es endémica de Chile. ';
      if(sp.extinta === 1){
        descripcion +='Actualmente su estatus de conservación es "Extinta".';
      }else if(sp.enPeligro === 1){
        descripcion +='Actualmente su estatus de conservación es "En peligo de extinción".';
      }else if(sp.vulnerable === 1){
        descripcion +='Actualmente su estatus de conservación es "Especie vulnerable".';
      }else if(sp.rara === 1){
        descripcion +='Es considerada como una especie "Rara".';
      }
    }else{
      descripcion +='.';}
  }//END... if(sp.type===3){

   return descripcion;
};

});





