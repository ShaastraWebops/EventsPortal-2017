'use strict';

var express = require('express');
var controller = require('./college.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/generateCheckSum/:id', controller.generateCheckSum);
router.post('/verifyPayment/:id', controller.verifyPayment);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;