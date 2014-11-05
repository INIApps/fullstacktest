'use strict';

angular.module('fullstack012App')
  .factory('FloraeObj', function () {
    /**
     * Constructor
     * @param sp
     * @constructor
     */
    function Florae(sp){
      if (sp) {
        this.setData(sp);
      }
    }

    /**
     * Publick methods
     * @returns {*}
     */

    Florae.prototype.flujoGenico = function (){
      if(!this.type){
        return;
      }
      var resultFlujoGenico;

      if(this.spCompare.type===4){ resultFlujoGenico = this.flujoGenicoTransgenico(); }
      if(this.spCompare.type===1){ resultFlujoGenico = this.flujoGenicoCultivadas(); }

      if (this.polFx) {
        var complement = 1 - resultFlujoGenico;
        resultFlujoGenico = resultFlujoGenico + this.polFx * complement;
      }

      return resultFlujoGenico*100;
    };

    Florae.prototype.flujoGenicoTransgenico = function (){
      var resultFlujoGenicoTransgenico;
      if(this.type===1){ resultFlujoGenicoTransgenico = this.rasC(); }
      if(this.type===2){ resultFlujoGenicoTransgenico = this.rasI(); }
      if(this.type===3){ resultFlujoGenicoTransgenico = this.rasN(); }

      resultFlujoGenicoTransgenico = resultFlujoGenicoTransgenico * this.spCompare.flujo;

      if(this.spCompare.especie === this.especie || this.spCompare.taxa === this.taxa){ resultFlujoGenicoTransgenico +=0.5; }

      return resultFlujoGenicoTransgenico;
    };

    Florae.prototype.flujoGenicoCultivadas = function (){
      var resultFlujoGenicoCultivo;
      if(this.type===1){ resultFlujoGenicoCultivo = this.rasC(); }
      if(this.type===2){ resultFlujoGenicoCultivo = this.rasI(); }
      if(this.type===3){ resultFlujoGenicoCultivo = this.rasN(); }

      if(this.spCompare.especie === this.especie || this.spCompare.taxa === this.taxa){ resultFlujoGenicoCultivo +=0.5; }

      return resultFlujoGenicoCultivo;
    };

    Florae.prototype.rasC = function(){
      var SumaC = 1;

      this.R = Re.cultivada;

      var riesgoC = (
        this.R.CtipO.subItems.Cen.value*this.endemico +
        this.R.CtipO.subItems.Cnati.value*this.nativo +
        this.R.CtipO.subItems.Cin.value*this.introducido +
        this.R.CtipO.subItems.Cnatu.value*this.naturalizado) * this.R.CtipO.value;

      riesgoC += (
      this.R.CtipC.subItems.Cag.value*this.agricola +
      this.R.CtipC.subItems.Cor.value*this.ornamental +
      this.R.CtipC.subItems.Cfo.value*this.forestal +
      this.R.CtipC.subItems.Cma.value*this.maleza) * this.R.CtipC.value;

      riesgoC += (
      this.R.Cland.subItems.Clan.value*this.landrace) * this.R.Cland.value;

      riesgoC += (
      this.R.CtipR.subItems.Cse.value*this.semilla +
      this.R.CtipR.subItems.Cve.value*this.vegetativa) * this.R.CtipR.value;

      riesgoC += (
      this.R.Ccv.subItems.Can.value*this.anual +
      this.R.Ccv.subItems.Cbi.value*this.bianual +
      this.R.Ccv.subItems.Cpe.value*this.perenne +
      this.R.Ccv.subItems.Cbu.value*this.bulbosa) * this.R.Ccv.value;

      riesgoC += (
      this.R.CtipP.subItems.Calg.value*this.alogama +
      this.R.CtipP.subItems.Cang.value*this.autogama) * this.R.CtipP.value;

      riesgoC += (
      this.R.CagP.subItems.Cent.value*this.entomofila +
      this.R.CagP.subItems.Cane.value*this.anemofila +
      this.R.CagP.subItems.Cart.value*this.artificial) * this.R.CagP.value;

      return riesgoC/(576 * SumaC);
    };

    Florae.prototype.rasI = function(){
      var SumaI = 1 ;
      this.R = Re.introducida;
      var riesgoI  = (
        this.R.Itipoc.subItems.Ia.value*this.agricola +
        this.R.Itipoc.subItems.If.value*this.forestal +
        this.R.Itipoc.subItems.Ima.value*this.maleza +
        this.R.Itipoc.subItems.Io.value*this.ornamental +
        this.R.Itipoc.subItems.Ime.value*this.medicinal) * this.R.Itipoc.value;

      riesgoI += (
      this.R.Iotr.subItems.In.value * this.naturalizada) * this.R.Iotr.value;
      riesgoI = riesgoI/( 216 * SumaI);
      return riesgoI;
    };

    Florae.prototype.rasN = function(){
      var SumaN  = 1;
      this.R = Re.nativa;

      var riesgoN  = (
        this.R.NcEc.subItems.Np.value *  this.enPeligro   +
        this.R.NcEc.subItems.Nex.value *  this.extinta  +
        this.R.NcEc.subItems.Nr.value *  this.rara   +
        this.R.NcEc.subItems.Nv.value *  this.vulnerable ) * this.R.NcEc.value;

      riesgoN += this.R.Notr.subItems.Nen.value * this.endemica * this.R.Notr.value;

      riesgoN = riesgoN /( 144 * SumaN );

      return riesgoN;
    };

    Florae.prototype.riskLevel = function(){

      if(this.flujoGenico() >=0 && this.flujoGenico() <= 20){
        return 'muy bajo'; // muy bajo
      }
      if(this.flujoGenico() > 20 && this.flujoGenico() <=40){
        return 'bajo'; // bajo
      }
      if(this.flujoGenico() >40 && this.flujoGenico() <= 60){
        return 'medio'; // medio
      }
      if(this.flujoGenico() >60 && this.flujoGenico() <= 80){
        return 'alto'; // alto
      }
      if(this.flujoGenico() > 80){
        return 'muy alto'; // muy alto
      }
    };

    Florae.prototype.colorRisk = function(){

      if(this.flujoGenico() <=0.99999999){
        return ''; // sin reporte
      }
      if(this.flujoGenico() >=1 && this.flujoGenico() <= 20){
        return '#F0FAFF'; // muy bajo
      }
      if(this.flujoGenico() > 20 && this.flujoGenico() <=40){
        return '#FFFFE6'; // bajo
      }
      if(this.flujoGenico() >40 && this.flujoGenico() <= 60){
        return '#FFD699'; // medio
      }
      if(this.flujoGenico() >60 && this.flujoGenico() <= 80){
        return '#FFAD99'; // alto
      }
      if(this.flujoGenico() > 80){
        return '#FF6666'; // muy alto
      }
    };

    Florae.prototype.description = function(){
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

    Florae.prototype.setData = function(Data){
      angular.extend(this, Data);
    };

    Florae.prototype.getShortName = function(Data){
      return this.genero+' '+this.especie;
    };

    Florae.prototype.getNumRegiones = function(Data){
      if(this.dist){
        return this.dist.length;
      }
    };

    /**
     * Private variable
     * @type {{cultivada: {CtipO: {value: number, label: string, subItems: {Cen: {value: number, label: string}, Cnati: {value: number, label: string}, Cin: {value: number, label: string}, Cnatu: {value: number, label: string}}}, CtipR: {value: number, label: string, subItems: {Cse: {value: number, label: string}, Cve: {value: number, label: string}}}, Ccv: {value: number, label: string, subItems: {Can: {value: number, label: string}, Cbi: {value: number, label: string}, Cpe: {value: number, label: string}, Cbu: {value: number, label: string}}}, CtipP: {value: number, label: string, subItems: {Cang: {value: number, label: string}, Calg: {value: number, label: string}}}, CagP: {value: number, label: string, subItems: {Cent: {value: number, label: string}, Cane: {value: number, label: string}, Cart: {value: number, label: string}}}, Cland: {value: number, label: string, subItems: {Clan: {value: number, label: string}}}, CtipC: {value: number, label: string, subItems: {Cag: {value: number, label: string}, Cor: {value: number, label: string}, Cfo: {value: number, label: string}, Cma: {value: number, label: string}}}}, introducida: {Itipoc: {value: number, label: string, subItems: {Ia: {value: number, label: string}, Io: {value: number, label: string}, If: {value: number, label: string}, Ime: {value: number, label: string}, Ima: {value: number, label: string}}}, Iotr: {value: number, label: string, subItems: {In: {value: number, label: string}}}}, nativa: {NcEc: {value: number, label: string, subItems: {Nex: {value: number, label: string}, Np: {value: number, label: string}, Nv: {value: number, label: string}, Nr: {value: number, label: string}}}, Notr: {value: number, label: string, subItems: {Nen: {value: number, label: string}}}}}}
     */

    var Re = {
      cultivada : {
        CtipO:  {value: 1,label:'Tipo de Origen',
          subItems:{
            Cen:  {value: 6,label:'Endémica'},
            Cnati:  {value: 5,label:'Nativa'},
            Cin:  {value: 2,label:'Introducida'},
            Cnatu:  {value: 4,label:'Naturalizada'}
          }
        },
        CtipR:  {value: 1,label:'Tipo de reproducción',
          subItems:{
            Cse:  {value: 4,label:'Sexual'},
            Cve:  {value: 5,label:'Vegetativa'}
          }
        },
        Ccv:  {value: 1,label:'Ciclo de vida',
          subItems:{
            Can:  {value: 4,label:'Anual'},
            Cbi:  {value: 4,label:'Bianual'},
            Cpe:  {value: 3,label:'Perenne'},
            Cbu:  {value: 3,label:'Bulbosa'}
          }
        },
        CtipP:  {value: 1,label:'Tipo de polinización',
          subItems:{
            Cang:   {value: 2,label:'Autógama'},
            Calg:   {value: 5,label:'Alógama'}
          }
        },
        CagP:   {value: 1,label:'Agente polinizante',
          subItems:{
            Cent:   {value: 4,label:'Entomófila'},
            Cane:   {value: 3,label:'Anemófila'},
            Cart:   {value: 2,label:'Artificial'}
          }
        },
        Cland:  {value: 1,label:'Landrac',
          subItems:{
            Clan:  {value: 5,label:'Landrace'}
          }
        },
        CtipC: {value:1,label:'Tipo de cultivo',
          subItems:{
            Cag: {value:3,label:'Agrícola'},
            Cor: {value:2,label:'Ornamental'},
            Cfo: {value:2,label:'Forestal'},
            Cma: {value:6,label:'Maleza'}
          }
        }
      },
      introducida : {
        Itipoc :  {value:1,label:'Tipo de especie',
          subItems:{
            Ia :  {value:3,label:'Agrícola'},
            Io :  {value:2,label:'Ornamental'},
            If :  {value:2,label:'Forestal'},
            Ime : {value:3,label:'Medicinal'},
            Ima : {value:6,label:'Maleza'}
          }
        },
        Iotr :{value:1,label:'Naturalizada',
          subItems:{
            In :  {value:5,label:'Naturalizada'}
          }
        }

      },
      nativa : {
        NcEc :{value:1,label:'Estatus de conservación',
          subItems:{
            Nex :{value:2,label:'Extinta'},
            Np :{value:6,label:'En peligro'},
            Nv :{value:5,label:'Vulnerable'},
            Nr :{value:4,label:'Rara'}
          }
        },
        Notr :{value:1,label:'Endemismo',
          subItems:{
            Nen :{value:3,label:'Endemica'}
          }
        }
      }
    };

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */

    Florae.R = angular.copy(Re);

    /**
     * Statick method
     * Instance ('this') is not available in static context
     * @param data
     */

    Florae.build = function(sp){
      return new Florae(sp);
    };

    return Florae;

  });
