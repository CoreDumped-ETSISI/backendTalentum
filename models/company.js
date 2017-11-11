'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const Offer = require ('./offer.js')

var companySchema = new Schema({
  name: String,
  address: String,
  email: String,
  offers: [Offer]
});

module.exports = mongoose.model('Company', companySchema);
