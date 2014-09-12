'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FloraSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
}, { strict: false });

// var FloraSchema = new Schema({
//     familia : String,
//     genero : String,
//     especie : String,
//     variedad : String,
//     taxa : String,
//     name_es : String,
//     origen : String,
//     endemico : Number,
//     nativo : Number,
//     introducido : Number,
//     naturalizado : Number,
//     agricola : Number,
//     ornamental : Number,
//     forestal : Number,
//     maleza : Number,
//     anual : Number,
//     bianual : Number,
//     perenne : Number,
//     bulbosa : Number,
//     autogama : Number,
//     alogama : Number,
//     entomofila : Number,
//     anemofila : Number,
//     artificial : Number,
//     landrace : Number,
//     semilla : Number,
//     vegetativa : Number,
//     type : Number,
//     dist : [RegionFloraSchema]
// });

// var RegionFloraSchema = new Schema({
//     name : String,
//     code : String,
//     provincias : [ProvinciaFloraSchema]
// });

// var ProvinciaFloraSchema = new Schema({
//     name : String,
//     code : String,
//     comunas : [ComunaFloraSchema]
// });

// var ComunaFloraSchema = new Schema({
//     name : String,
//     code : String
// });



module.exports = mongoose.model('Flora', FloraSchema);