'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema

var questionSchema = new Schema({
  text: String,
  image: String,
  category: String,
  options: {
      option1: String,
      option2: String
  }
});

module.exports = mongoose.model('Question', questionSchema);
