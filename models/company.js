'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const Offer = require ('./offer.js')


var companySchema = new Schema({
  name: string,
  address: string,
  email: string,
  offers: [Offer]
});

module.exports = mongoose.model('Company', companySchema);