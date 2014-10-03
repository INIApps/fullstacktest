'use strict';

var express = require('express');
var controller = require('./pollinator.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/paginado', controller.paginado);
router.get('/:id', controller.show);
router.get('/idlink/:id', controller.showlink);
router.get('/relation/:idA/:idB', controller.getMatch);
router.get('/single/:idA', controller.getMatchSingle);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/flora/:id', controller.updateFlora);
router.put('/flora/pull/:id', controller.updateFloraPull);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;