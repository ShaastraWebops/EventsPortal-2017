'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FunzoneSchema = new Schema({
  slot: String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Funzone', FunzoneSchema);