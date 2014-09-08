'use strict';

var express = require('express');
var controller = require('./flora.controller');

var router = express.Router();
router.get('/relacion/:genero', controller.relacion);
router.get('/relacion_informe/:genero', controller.relacion_informe);
router.get('/transgenicas_r', controller.transgenicas_r);
router.get('/transgenicas_filtradas', controller.transgenicas_filtradas);
router.get('/transgenicas', controller.transgenicas);
router.get('/cultivadas_r', controller.cultivadas_r);
router.get('/cultivadas', controller.cultivadas);
router.get('/introducidas', controller.introducidas);
router.get('/nativas', controller.nativas);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;