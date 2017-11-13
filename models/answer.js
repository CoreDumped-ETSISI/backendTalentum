'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var answerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId , ref: 'User', require: true},
  questionId: { type: Schema.Types.ObjectId , ref: 'Question', require: true},
  answer: { type: String, require: true},
  timestamp: { type:Date, default: Date.now() }
});

module.exports = mongoose.model('Answer', answerSchema);
