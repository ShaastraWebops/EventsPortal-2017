'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollegeSchema = new Schema({
  collegeName: String,
  createdOn: { type: Date, default: Date.now() },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('College', CollegeSchema);