'use strict';

angular.module('fullstack012App').controller('InformeCtrl', function ($scope, $http) {
$scope.modal = false;
$scope.modalFn = function(sp){
	$scope.modal = sp;
	$scope.modal.description = $scope.description(sp);
};
//$scope.currentPage = 'informe';
$http.get('/api/flora/transgenicas_filtradas').success(function(awesomeThings) {
  $scope.transgenicas = awesomeThings;
  $scope.people = awesomeThings;
});

$http.get('/api/flora/cultivadas_r').success(function(awesomeThings) {
  $scope.cultivadas = awesomeThings;
});
$scope.color = function(flujo){
	if(flujo <= 33){ return 'info'; }
	if(flujo >34 && flujo <=66){ return 'warning'; }
	if(flujo >67){ return 'danger'; }
};
$scope.getMatch = function (){
	$http.get('/api/flora/relacion_informe/'+$scope.spCompare.genero).success(function(data){
	    //$scope.especieSeleccionada = sp;
	    for (var i = data.length - 1; i >= 0; i--) {
	    	data[i].flujo = $scope.FlujoGenico(data[i]);
	    	data[i].nivel = $scope.riskLevel($scope.FlujoGenico(data[i]));
	    }
	    $scope.especiesMatch = data;
		var I = 	{'especies':[],'order':1,"code":"01","name":"Región de Tarapacá"};
		var II = 	{'especies':[],'order':2,"code":"02","name":"Región de Antofagasta"};
		var III = 	{'especies':[],'order':3,"code":"03","name":"Región de Atacama"};
		var IV = 	{'especies':[],'order':4,"code":"04","name":"Región de Coquimbo"};
		var V = 	{'especies':[],'order':5,"code":"05","name":"Región de Valparaíso"};
		var VI = 	{'especies':[],'order':8,"code":"06","name":"Región del Libertador General Bernardo O’Higgins"};
		var VII = 	{'especies':[],'order':9,"code":"07","name":"Región del Maule"};
		var VIII = 	{'especies':[],'order':10,"code":"08","name":"Región del Biobío"};
		var IX = 	{'especies':[],'order':11,"code":"09","name":"Región de La Araucanía"};
		var X = 	{'especies':[],'order':13,"code":"10","name":"Región de Los Lagos"};
		var XI = 	{'especies':[],'order':14,"code":"12","name":"Región de Magallanes y de la Antártica Chilena"};
		var XII = 	{'especies':[],'order':15,"code":"11","name":"Región de Aysén del General Carlos Ibáñez del Campo"};
		var XIII = 	{'especies':[],'order':6,"code":"13","name":"Región Metropolitana de Santiago"};
		var XIV = 	{'especies':[],'order':12,"code":"14","name":"Región de Los Ríos"};
		var XV = 	{'especies':[],'order':0,"code":"15","name":"Región de Arica y Parinacota "};
		if(data.length>0){
		    for (var e = data.length - 1; e >= 0; e--) {
			    if(data[e].dist && data[e].dist.length > 0){
				    for (var j = data[e].dist.length - 1; j >= 0; j--) {
				        if(data[e].dist[j].code ==='01'){I.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='02'){II.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='03'){III.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='04'){IV.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='05'){V.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='06'){VI.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='07'){VII.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='08'){VIII.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='09'){IX.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='10'){X.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='11'){XI.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='12'){XII.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='13'){XIII.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='14'){XIV.especies.push(data[e]); }
				        if(data[e].dist[j].code ==='15'){XV.especies.push(data[e]); }
				    }
			    }
		    }
		}
	    $scope.spFiltradas = [I,II,III,IV,V,VI,VII,VIII,IX,X,XI,XII,XIII,XIV,XV];
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

  if(sp.nameEs){
	  if(sp.nameEs.length > 0 && sp.nameEs[0].name){ 
	    descripcion += ' (nombre común: '+ sp.nameEs[0].name + ')'; 
	  }else if (sp.nameEs){
	    descripcion += ' (nombre común: '+ sp.nameEs + ')';
	  }
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

//$scope.person = {};
// $scope.people = [
//   { name: 'Adam',      email: 'adam@email.com',      age: 10 },
//   { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
//   { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
//   { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
//   { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
//   { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
//   { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
//   { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
// ];
//$scope.spCompare;

  // $scope.$watch('spCompare', function(newValue, oldValue) {
  //   //$scope.getMatch();
  //   console.log($scope.spCompare);
  //   // if ($scope.spCompare) {
      
  //   // }
  // });


});

// angular.module('fullstack012App').filter('propsFilter', function() {
//   return function(items, props) {
//     var out = [];

//     if (angular.isArray(items)) {
//       items.forEach(function(item) {
//         var itemMatches = false;

//         var keys = Object.keys(props);
//         for (var i = 0; i < keys.length; i++) {
//           var prop = keys[i];
//           var text = props[prop].toLowerCase();
//           if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
//             itemMatches = true;
//             break;
//           }
//         }

//         if (itemMatches) {
//           out.push(item);
//         }
//       });
//     } else {
//       // Let the output be the input untouched
//       out = items;
//     }

//     return out;
//   };
// });



