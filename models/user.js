'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema
const Question  = require ('./question.js')

var userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  avatarImage: String,
  password: { type: String, select: false, required: true },
  signUpDate: { type:Date, default: Date.now() },
  cv: [{
    question: { type: Question },
    answer: { type: String },
    timestamp: { type:Date, default: Date.now() }
  }]
});

module.exports = mongoose.model('User', userSchema);
