'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema

var questionSchema = new Schema({
  text: string,
  image: string,
  options: {
      option1: string,
      option2: string
  }
});

module.exports = mongoose.model('Question', questionSchema);