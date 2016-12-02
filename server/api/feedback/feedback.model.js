'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  eventName: String,
  comment: String,
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  q6: String,
  q7: String,
  q8: String,
  q9: String,
  q10: String,
  q11: String,
  q12: String,
  q13: String,
  q14: String,
  q15: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);