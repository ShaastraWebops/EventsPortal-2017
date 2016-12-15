'use strict';

var _ = require('lodash');
var Funzone = require('./funzone.model');
var User = require('../user/user.model');

// Get list of funzones
exports.index = function(req, res) {
  Funzone.find({})
  .populate('participants', 'name secondName email phoneNumber festID')
  .exec(function (err, funzones) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(funzones);
  });
};

// Get a single funzone
exports.show = function(req, res) {
  Funzone.findById(req.params.id) 
  .exec(function (err, funzone) {
    if(err) { return handleError(res, err); }
    if(!funzone) { return res.status(404).send('Not Found'); }
    return res.json(funzone);
  });
};

// Creates a new funzone in the DB.
exports.create = function(req, res) {
  Funzone.create(req.body, function (err, funzone) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(funzone);
  });
};

exports.include = function(req, res) {
  Funzone.findByIdAndUpdate(
    req.params.id,
    {$push: {"participants": req.body.userid}},
    {new : true},
    function(err, model) {
      return res.status(200).json(model);
    }
  );
};

exports.remove = function(req, res) {
  Funzone.findByIdAndUpdate(
    req.params.id,
    {$pull: {"participants": req.body.userid}},
    function(err, model) {
      return res.status(200).json(model);
    }
  );
};

// Updates an existing funzone in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Funzone.findById(req.params.id, function (err, funzone) {
    if (err) { return handleError(res, err); }
    if(!funzone) { return res.status(404).send('Not Found'); }
    var updated = _.merge(funzone, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(funzone);
    });
  });
};

// Deletes a funzone from the DB.
exports.destroy = function(req, res) {
  Funzone.findById(req.params.id, function (err, funzone) {
    if(err) { return handleError(res, err); }
    if(!funzone) { return res.status(404).send('Not Found'); }
    funzone.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}