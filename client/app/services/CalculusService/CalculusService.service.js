'use strict';

angular.module('fullstack012App')
  .service('Calculusservice', function Calculusservice() {
  	var that = this;

    this.FlujoGenico = function (sp, R){
    	if(R){
    		sp.R = R;
    	}
		var resultFlujoGenico;
		if(sp.spCompare.type===4){ resultFlujoGenico = that.FlujoGenicoTransgenico(sp); }
		if(sp.spCompare.type===1){ resultFlujoGenico = that.FlujoGenicoCultivadas(sp); }

		return resultFlujoGenico;
    };

	this.FlujoGenicoTransgenico = function (sp){
      var resultFlujoGenicoTransgenico;
      if(sp.type===1){ resultFlujoGenicoTransgenico = that.rasC(sp); }
      if(sp.type===2){ resultFlujoGenicoTransgenico = that.rasI(sp); }
      if(sp.type===3){ resultFlujoGenicoTransgenico = that.rasN(sp); }

      resultFlujoGenicoTransgenico = resultFlujoGenicoTransgenico * sp.spCompare.flujo;

      if(sp.spCompare.especie === sp.especie || sp.spCompare.taxa === sp.taxa){ resultFlujoGenicoTransgenico +=50; }
      
      return resultFlujoGenicoTransgenico;
    };

    this.FlujoGenicoCultivadas = function (sp){
      var resultFlujoGenicoCultivo;
      if(sp.type===1){ resultFlujoGenicoCultivo = that.rasC(sp); }
      if(sp.type===2){ resultFlujoGenicoCultivo = that.rasI(sp); }
      if(sp.type===3){ resultFlujoGenicoCultivo = that.rasN(sp); }

      if(sp.spCompare.especie === sp.especie || sp.spCompare.taxa === sp.taxa){ resultFlujoGenicoCultivo +=50; }
      
      return resultFlujoGenicoCultivo;
    };

    this.rasC = function(sp){
      var SumaC = 1;

        var riesgoC = (
            sp.R.Cen*sp.endemico + 
            sp.R.Cnati*sp.nativo + 
            sp.R.Cin*sp.introducido + 
            sp.R.Cnatu*sp.naturalizado) * sp.R.CtipO;                  
        
        riesgoC += (
            sp.R.Cag*sp.agricola + 
            sp.R.Cor*sp.ornamental + 
            sp.R.Cfo*sp.forestal + 
            sp.R.Cma*sp.maleza) * sp.R.CtipC;

        riesgoC += (
            sp.R.Clan*sp.landrace) * sp.R.Cland;

        riesgoC += (
            sp.R.Cse*sp.semilla + 
            sp.R.Cve*sp.vegetativa) * sp.R.CtipR;
        
        riesgoC += (
            sp.R.Can*sp.anual + 
            sp.R.Cbi*sp.bianual + 
            sp.R.Cpe*sp.perenne + 
            sp.R.Cbu*sp.bulbosa) * sp.R.Ccv;
        
        riesgoC += (
            sp.R.Calg*sp.alogama + 
            sp.R.Cang*sp.autogama) * sp.R.CtipP;
        
        riesgoC += (
            sp.R.Cent*sp.entomofila + 
            sp.R.Cane* sp.anemofila + 
            sp.R.Cart*sp.artificial) * sp.R.CagP;
        
       return riesgoC/(576 * SumaC)*100;
    };

    this.rasI = function(sp){
      var SumaI = 1 ;
      var riesgoI  = (
        sp.R.Ia*sp.agricola + 
        sp.R.If*sp.forestal + 
        sp.R.Ima*sp.maleza + 
        sp.R.Io*sp.ornamental + 
        sp.R.Ime*sp.medicinal) * sp.R.Itipoc;

      riesgoI += (
        sp.R.In * sp.naturalizada) * sp.R.Iotr;
      riesgoI = riesgoI/( 216 * SumaI)*100;
      return riesgoI;
    };

    this.rasN = function(sp){
      var SumaN  = 1;
      
      var riesgoN  = (
        sp.R.Np  *  sp.enPeligro   + 
        sp.R.Nex *  sp.extinta  + 
        sp.R.Nr  *  sp.rara   + 
        sp.R.Nv  *  sp.vulnerable ) * sp.R.NcEc;

      riesgoN += sp.R.Nen * sp.endemica * sp.R.Notr;

      riesgoN = riesgoN /( 144 * SumaN ) * 100;

      return riesgoN;
    };

    this.riskLevel = function(flujo){
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

    var riskLevelM = function(){
      if(this.flujoGenico < 33.3333){
        return 'Bajo';
      }
      if(this.flujoGenico >=33.3333 && this.flujoGenico< 66.6666){
        return 'Medio';
      }
      if(this.flujoGenico >= 66.6666){
        return 'Alto';
      }
    };

    this.colorRisk = function(flujo){
      if(flujo < 33.3333){
        return 'blue';
      }
      if(flujo >=33.3333 && flujo< 66.6666){
        return 'yellow';
      }
      if(flujo >= 66.6666){
        return 'red';
      }
    };

    var colorRiskM = function(){
      if(this.flujoGenico < 33.3333){
        return '#04d0ff';
      }
      if(this.flujoGenico >=33.3333 && this.flujoGenico < 66.6666){
        return '#fffa49';
      }
      if(this.flujoGenico >= 66.6666){
        return '#ff7670';
      }
    };

    this.description = function(sp){
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

      // if(sp.type===3){
      //   //2.     Endémica
      //   if(sp.endemica===1){
      //     descripcion +=' y es endémica de Chile. ';
      //     if(sp.extinta === 1){
      //       descripcion +='Actualmente su estatus de conservación es "Extinta".';
      //     }else if(sp.enPeligro === 1){
      //       descripcion +='Actualmente su estatus de conservación es "En peligo de extinción".';
      //     }else if(sp.vulnerable === 1){
      //       descripcion +='Actualmente su estatus de conservación es "Especie vulnerable".';
      //     }else if(sp.rara === 1){
      //       descripcion +='Es considerada como una especie "Rara".';
      //     }
      //   }else{
      //     descripcion +='.';}
      // }
      //END... if(sp.type===3){

       return descripcion;
    };

    this.R = function (){
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
	    return Re;
    };

    this.setAndConfig = function (data, spComp){
		for (var i = data.length - 1; i >= 0; i--) {
			data[i].spCompare    = spComp;
			data[i].R            = that.R();
			data[i].flujoGenico  = that.FlujoGenico(data[i]);
			data[i].descripcion  = that.description(data[i]);
			//data[i].riskLevel    = that.riskLevel(data[i].flujoGenico);
			//data[i].colorRisk    = that.colorRisk(data[i].flujoGenico);
			data[i].riskLevel   = riskLevelM;
			data[i].colorRisk    = colorRiskM;
		}
		return data;
    };

    this.pollinatorFx = function(data, sp){
    	var pollinators =  that.configPollinatorObj(data);
    	sp.pollinators = pollinators;
    	if(data.length > 0){
    		console.log('dentro del if');
    		var H = 0;
    		var D = 0;
    		var C = 0;
    		var L = 0;
    		if(pollinators.hymenoptera	> 0){ H =1;}
    		if(pollinators.lepidoptera	> 0){ L =1;}
    		if(pollinators.coleoptera	> 0){ C =1;}
    		if(pollinators.diptera		> 0){ D =1;}
    		var P = {
    			fg : 4,
    			ipG : 5,
    			h : 5,
    			d : 3,
    			l : 4,
    			c : 2
    		};
    		var ip = (H*P.h + D*P.d + C*P.c + L*P.l)/20;
    		var fgOld = sp.flujoGenico/100;
    		var rest = 1-fgOld;
    		var pondPol = 0.8;
    		var cira = (fgOld + ip*rest*pondPol)*100;
    		console.log('cira -> '+cira);
    		if(cira > sp.flujoGenico){
    			sp.oldFlujoGenico = sp.flujoGenico;
    			sp.flujoGenico = cira;
    		}
    	}
    	return sp;
    };

    this.configPollinatorObj = function(data){
		var pollinators = {};
		pollinators.list = data;
		pollinators.hymenoptera = 0;
		pollinators.lepidoptera = 0;
		pollinators.coleoptera = 0;
		pollinators.diptera = 0;
		for (var i = data.length - 1; i >= 0; i--) {
			switch (data[i].orden){
			  case 'Hymenoptera':
			      pollinators.hymenoptera++;
			      break;
			  case 'Lepidoptera':
			      pollinators.lepidoptera++;
			      break;
			  case 'Coleoptera':
			      pollinators.coleoptera++;
			      break;
			  case 'Diptera':
			      pollinators.diptera++;
			      break;
			}
		}
		return pollinators;
    };

  });