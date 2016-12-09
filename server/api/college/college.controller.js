'use strict';

var _ = require('lodash');
var College = require('./college.model');
var User = require('../user/user.model');
var checksum = require('./checksum');

// Get list of colleges
exports.index = function(req, res) {
  College.find({})
  .sort('collegeName')
  .exec(function (err, colleges) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(colleges);
  });
};

var MID = 'Indian98368171296079';
var PAYTM_MERCHANT_KEY = 'XPSYivC4MsNSpAz5';
var WEBSITE = 'indweb';
var CHANNEL_ID =  'WEB';
var INDUSTRY_TYPE_ID = 'Retail';
exports.generateCheckSum = function(req, res) {
  var CALLBACK_URL = "http://shaastra.org:8001/api/colleges/verifyPayment/" + req.params.id;
  var paramlist = req.body;
  var paramarray = new Array();
  var result1 = req.body;
  result1.MID = MID;
  result1.INDUSTRY_TYPE_ID =INDUSTRY_TYPE_ID;
  result1.CHANNEL_ID = CHANNEL_ID;
  result1.WEBSITE = WEBSITE;
  result1.CALLBACK_URL = CALLBACK_URL;
  console.log(paramlist);
  for (var name in paramlist){
    paramarray[name] = paramlist[name] ;
  }
  paramarray['MID'] = MID;
  paramarray['INDUSTRY_TYPE_ID'] = INDUSTRY_TYPE_ID;
  paramarray['CHANNEL_ID'] = CHANNEL_ID;
  paramarray['WEBSITE'] = WEBSITE;
  paramarray['CALLBACK_URL'] = CALLBACK_URL;
  console.log(paramarray);
  checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result) {
    console.log("genchecksum is");
    console.log(result);
    // result1.CHECKSUMHASH = result.CHECKSUMHASH;
    // console.log(result1);
    //return res.json(result1);
    res.render('pgredirect.ejs',{ 'restdata' : result });
  });
};

exports.verifyPayment = function(req, res) {
  var paramlist = req.body;
  var paramarray = new Array();
  console.log(paramlist);
  console.log(req.params.id);
  var complete = "" + paramlist.CURRENCY + " " + paramlist.TXNAMOUNT + "_" + paramlist.BANKTXNID + "_" + paramlist.TXNDATE;
  console.log(complete);
  if(checksum.verifychecksum(paramlist, PAYTM_MERCHANT_KEY) && paramlist.STATUS == "TXN_SUCCESS"){
    console.log("true");
    User.findByIdAndUpdate(
      req.params.id,
      {$push: {"paymentDetails": complete}},
      {new : true},
      function(err, model) {
      }
    );
    res.render('response.ejs',{ 'restdata' : "true" ,'paramlist' : paramlist});
  }else{
    console.log("false");
    res.render('response.ejs',{ 'restdata' : "false" , 'paramlist' : paramlist});
  };
};

// Get a single college
exports.show = function(req, res) {
  College.findById(req.params.id, function (err, college) {
    if(err) { return handleError(res, err); }
    if(!college) { return res.status(404).send('Not Found'); }
    return res.json(college);
  });
};

// Creates a new college in the DB.
exports.create = function(req, res) {
  College.create(req.body, function (err, college) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(college);
  });
};

// Updates an existing college in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  College.findById(req.params.id, function (err, college) {
    if (err) { return handleError(res, err); }
    if(!college) { return res.status(404).send('Not Found'); }
    var updated = _.merge(college, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(college);
    });
  });
};

// Deletes a college from the DB.
exports.destroy = function(req, res) {
  College.findById(req.params.id, function (err, college) {
    if(err) { return handleError(res, err); }
    if(!college) { return res.status(404).send('Not Found'); }
    college.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}