'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var offerSchema = new Schema({
  title: String,
  payout: String,
  companyName: String,
  sector: String,
  description: String,
  tasks: String
});

module.exports = mongoose.model('Offer', offerSchema);
