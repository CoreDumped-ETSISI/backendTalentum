'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: String,
  address: String,
  email: String
});

module.exports = mongoose.model('Company', companySchema);
