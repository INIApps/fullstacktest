'use strict';

angular.module('fullstack012App')
  .factory('Florae', function () {
    function Florae(sp){
      if (sp) {
        this.setData(sp);
      }

      // for(var s in sp){
      //   this[s] = sp[s];
      // }

      var R = {
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

      this.flujoGenico = function (){
        if(!this.R){
          this.R = R;
        }
        if(!this.type){
          return;
        }
        var resultFlujoGenico;

        if(this.spCompare.type===4){ resultFlujoGenico = this.flujoGenicoTransgenico(); }
        if(this.spCompare.type===1){ resultFlujoGenico = this.flujoGenicoCultivadas(); }

        // if(){

        // }
        return resultFlujoGenico;
      };

      this.flujoGenicoTransgenico = function (){
        var resultFlujoGenicoTransgenico;
        if(this.type===1){ resultFlujoGenicoTransgenico = this.rasC(); }
        if(this.type===2){ resultFlujoGenicoTransgenico = this.rasI(); }
        if(this.type===3){ resultFlujoGenicoTransgenico = this.rasN(); }

        resultFlujoGenicoTransgenico = resultFlujoGenicoTransgenico * this.spCompare.flujo;

        if(this.spCompare.especie === this.especie || this.spCompare.taxa === this.taxa){ resultFlujoGenicoTransgenico +=50; }
        
        return resultFlujoGenicoTransgenico;
      };

      this.flujoGenicoCultivadas = function (){
        var resultFlujoGenicoCultivo;
        if(this.type===1){ resultFlujoGenicoCultivo = this.rasC(); }
        if(this.type===2){ resultFlujoGenicoCultivo = this.rasI(); }
        if(this.type===3){ resultFlujoGenicoCultivo = this.rasN(); }

        if(this.spCompare.especie === this.especie || this.spCompare.taxa === this.taxa){ resultFlujoGenicoCultivo +=50; }
        
        return resultFlujoGenicoCultivo;
      };

      this.rasC = function(){
        var SumaC = 1;

        var riesgoC = (
            this.R.Cen*this.endemico + 
            this.R.Cnati*this.nativo + 
            this.R.Cin*this.introducido + 
            this.R.Cnatu*this.naturalizado) * this.R.CtipO;                  
        
        riesgoC += (
            this.R.Cag*this.agricola + 
            this.R.Cor*this.ornamental + 
            this.R.Cfo*this.forestal + 
            this.R.Cma*this.maleza) * this.R.CtipC;

        riesgoC += (
            this.R.Clan*this.landrace) * this.R.Cland;

        riesgoC += (
            this.R.Cse*this.semilla + 
            this.R.Cve*this.vegetativa) * this.R.CtipR;
        
        riesgoC += (
            this.R.Can*this.anual + 
            this.R.Cbi*this.bianual + 
            this.R.Cpe*this.perenne + 
            this.R.Cbu*this.bulbosa) * this.R.Ccv;
        
        riesgoC += (
            this.R.Calg*this.alogama + 
            this.R.Cang*this.autogama) * this.R.CtipP;
        
        riesgoC += (
            this.R.Cent*this.entomofila + 
            this.R.Cane* this.anemofila + 
            this.R.Cart*this.artificial) * this.R.CagP;
        
       return riesgoC/(576 * SumaC)*100;
      };

      this.rasI = function(){
        var SumaI = 1 ;
        var riesgoI  = (
          this.R.Ia*this.agricola + 
          this.R.If*this.forestal + 
          this.R.Ima*this.maleza + 
          this.R.Io*this.ornamental + 
          this.R.Ime*this.medicinal) * this.R.Itipoc;

        riesgoI += (
          this.R.In * this.naturalizada) * this.R.Iotr;
        riesgoI = riesgoI/( 216 * SumaI)*100;
        return riesgoI;
      };

      this.rasN = function(){
        var SumaN  = 1;
        
        var riesgoN  = (
          this.R.Np  *  this.enPeligro   + 
          this.R.Nex *  this.extinta  + 
          this.R.Nr  *  this.rara   + 
          this.R.Nv  *  this.vulnerable ) * this.R.NcEc;

        riesgoN += this.R.Nen * this.endemica * this.R.Notr;

        riesgoN = riesgoN /( 144 * SumaN ) * 100;

        return riesgoN;
      };

      this.riskLevel = function(){
        if(this.flujoGenico() < 33.3333){
          return 'Bajo';
        }
        if(this.flujoGenico() >=33.3333 && this.flujoGenico()< 66.6666){
          return 'Medio';
        }
        if(this.flujoGenico() >= 66.6666){
          return 'Alto';
        }
      };

      this.riskLevelCira = function(){
        if(this.cira < 33.3333){
          return 'Bajo';
        }
        if(this.cira >=33.3333 && this.cira < 66.6666){
          return 'Medio';
        }
        if(this.cira >= 66.6666){
          return 'Alto';
        }
      };

      this.colorRisk = function(){
        if(this.flujoGenico() < 33.3333){
          return '#FFFFE6';
        }
        if(this.flujoGenico() >=33.3333 && this.flujoGenico() < 66.6666){
          return '#FFD699';
        }
        if(this.flujoGenico() >= 66.6666){
          return '#FFAD99';
        }
      };

      //this.fg = this.flujoGenico();

      // this.getPollinators = function(){
      //   return $http.get('/api/pollinator/single/'+this._id);
      // };

      this.description = function(){
        var descripcion =  this.taxa;
        if(this.nameEs){
          if(this.nameEs.length > 0 && this.nameEs[0].name){ 
            descripcion += ' (nombre común: '+ this.nameEs[0].name + ')'; 
          }else if (this.nameEs){
            descripcion += ' (nombre común: '+ this.nameEs + ')';
          }
        }
         
         descripcion +=' pertenece a la familia '+ this.familia;

        if(this.type===1){
          //tipo origen
          if(this.nativo===1 && this.endemico===1){ 
            descripcion +=' y corresponde a una especie nativa y endémica de Chile. ' ;
          }else if(this.endemico===1){ 
            descripcion +=' y corresponde a una especie de origen endémica en Chile. '; 
          }else if(this.nativo===1){ 
            descripcion +=' y corresponde a una especie nativa de Chile. ';
          }else if(this.introducido ===1 && this.naturalizado ===1){
            descripcion +=' y corresponde a una especie introducida y naturalizada en Chile. ';
          }else if(this.introducido ===1){
            descripcion +=' y corresponde a una especie introducida en Chile. ';
          }else if(this.naturalizado ===1){
            descripcion +=' y corresponde a una especie naturalizada en Chile. ';
          }else{
            descripcion +='.';
          }

          //ciclo de vida
          if(this.anual===1 && this.bianual===1 &&  this.bulbosa===1){descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual y bianual';}
          else if(this.anual===1 && this.bianual===1)      {descripcion +='Respecto a su biología, presenta un ciclo de vida anual y bianual';}
          else if(this.bianual===1 && this.anual===1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida anual';}
          else if(this.bianual===1 && this.bulbosa===1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida bianual';}
          else if(this.anual===1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida anual';}
          else if(this.bianual===1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida bianual';}
          else if(this.perenne===1 && this.bulbosa===1)      {descripcion +='Respecto a su biología, es una especie bulbosa que presenta un ciclo de vida perenne';}
          else if(this.perenne===1)                   {descripcion +='Respecto a su biología, presenta un ciclo de vida perenne';}
          else if(this.bulbosa===1)                   {descripcion +='Respecto a su biología, es una especie bulbosa';}
          else if(this.semilla===1 || this.vegetativa===1)      {descripcion +='Respecto a su biología, es una especie';}

          //tipo de reproducción
          if(this.semilla===1 && this.vegetativa===1)           {descripcion +=' con reproducción sexual y vegetativa';}
          else if(this.semilla===1)                   {descripcion +=' con reproducción sexual';}
          else if(this.vegetativa===1)                   {descripcion +=' con reproducción vegetativa';}

          //tipo polinizacion
          if (this.autogama===0 && this.alogama===0)        {descripcion +='.';}
          else if(this.autogama===1)                  {descripcion +=' y tipo de polinización autógama.';}
          else if(this.alogama===1){
           if(this.entomofila===1&&this.artificial===1)      {descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila), además de polinización artificial en sistemas productivos.';}
           else if(this.anemofila===1&&this.artificial===1) {descripcion +=' y tipo de polinización alógama realizada por viento (anemófila), además de polinización artificial en sistemas productivos.';}
           else if(this.anemofila===1)             {descripcion +=' y tipo de polinización alógama realizada por viento (anemófila).';}
           else if(this.entomofila===1)             {descripcion +=' y tipo de polinización alógama realizada por insectos (entomófila).';}
           else if(this.artificial===1)             {descripcion +=' y tipo de polinización alógama realizada de forma artificial en sistemas productivos.';}
           else                            {descripcion +='.';}
          }

          //tipo de especie
          if(this.agricola===1 && this.ornamental===1 && this.maleza===1) {descripcion +='En el área productiva, es una especie de importancia agrícola, ornamental y como maleza.';}
          else if(this.agricola===1 && this.maleza===1) {descripcion +='En el área productiva, es una especie de importancia agrícola y como maleza.';}
          else if(this.ornamental===1 && this.maleza===1) {descripcion +='En el área productiva, es una especie de importancia ornamental y como maleza.';}
          else if(this.maleza===1)               {descripcion +='En el área productiva, esta especie se comporta como maleza.';}
          else if(this.forestal===1)               {descripcion +='En el área productiva, es una especie de importancia forestal.';}
        }//END... if(this.type==1){

        if(this.type===2){
          //2.     Naturalizada
          var naturalizada ='';
          if(this.In===1){
            naturalizada ='naturalizada';
          }

          //1.     Tipo de especie
          if(this.agricola===1 && this.ornamental===1 && this.maleza===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola, ornamental y como maleza';
          }else if(this.agricola===1 && this.maleza===1 && this.medicinal===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y como maleza, además de su uso medicinal';
          }else if(this.agricola===1 && this.maleza===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y como maleza';
          }else if(this.ornamental===1 && this.maleza===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia ornamental y como maleza';
          }else if(this.agricola===1 && this.medicinal===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola y uso medicinal';
          }else if(this.agricola===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia agrícola';
          }else if(this.medicinal===1){
            descripcion +='. En el área productiva, esta especie '+naturalizada+' se comporta como maleza';
          }else if(this.forestal===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia forestal';
          }else if(this.maleza===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de uso medicinal';
          }else if(this.ornamental===1){
            descripcion +='. En el área productiva, es una especie '+naturalizada+' de importancia ornamental';
          }
          descripcion +='.';
        }//END... if(this.type===2){

        if(this.type===3){
          //2.     Endémica
          if(this.endemica===1){
            descripcion +=' y es endémica de Chile. ';
            if(this.extinta === 1){
              descripcion +='Actualmente su estatus de conservación es "Extinta".';
            }else if(this.enPeligro === 1){
              descripcion +='Actualmente su estatus de conservación es "En peligo de extinción".';
            }else if(this.vulnerable === 1){
              descripcion +='Actualmente su estatus de conservación es "Especie vulnerable".';
            }else if(this.rara === 1){
              descripcion +='Es considerada como una especie "Rara".';
            }
          }else{
            descripcion +='.';}
        }
        //END... if(this.type===3){

         return descripcion;
      };
    }

    Florae.prototype = {
      setData: function(Data){
          angular.extend(this, Data);
      },
      getShortName : function(){
        return this.genero+' '+this.especie;
      },
      getNumRegiones : function(){
        if(this.dist){
          return this.dist.length;
        }
      }
    };

    return Florae;
  });
//data = Calculusservice.setAndConfig(data,spCompare);

