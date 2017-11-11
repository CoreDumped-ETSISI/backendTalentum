'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var offerSchema = new Schema({
  title:string,
  payout: string,
  companyName: string,
  sector: string,
  description: string,
  tasks: string
});

module.exports = mongoose.model('Offer', offerSchema);