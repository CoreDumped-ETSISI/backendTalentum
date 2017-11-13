'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var offerSchema = new Schema({
  title: String,
  payout: String,
  companyName: String,
  sector: String,
  description: String,
  tasks: String,
  questions: [{
    _id:false,
    question: { type: Schema.Types.ObjectId , ref: 'Question', require: true},
    answer: { type: String, require: true}
  }],
  timestamp: { type:Date, default: Date.now() }
});

module.exports = mongoose.model('Offer', offerSchema);
