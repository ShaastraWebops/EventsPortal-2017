'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
// router.get('/sendMail/test', controller.sendMail);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/getCoords', controller.getCoords);
router.get('/sisFellows', auth.hasRole('superCoord'), controller.getSisFellows);
router.get('/QmsRegistrations', controller.QmsRegistrations);
router.get('/me', auth.isAuthenticated(), controller.me);
// router.get('/getAllEmailsHAHAHAPeopleRandom', controller.getAllEmails);
// router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/updateProfile', auth.isAuthenticated(), controller.updateProfile);
router.get('/controlRoom/:id', controller.controlRoom);
router.get('/:id', auth.isAuthenticated(), controller.show);
// router.post('/addDepartment', auth.hasRole('core'), controller.addDepartment);
// router.post('/addSubDepartment', auth.hasRole('core'), controller.addSubDepartment);
router.post('/QmsCreateUser', controller.QmsCreateUser);
router.post('/QmsUpdateUser', controller.QmsUpdateUser);
router.post('/forgotPassword', controller.forgotPassword);
router.post('/resetPassword/:token', controller.resetPassword);
router.post('/sisFellowship', auth.isAuthenticated(), controller.sisFellowship);
router.post('/onspot', controller.createOnspot);
router.post('/festid', controller.getByFestID);
router.post('/getAll', controller.getAllUsers);
router.post('/getAllSince', controller.getAllUsersSince);
router.post('/servertime', controller.getCurrentTime);
router.post('/updateEverything', controller.updateEverything);
router.post('/', controller.create);
module.exports = router;
