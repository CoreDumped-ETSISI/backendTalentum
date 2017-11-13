'use strict'

const express = require('express')
const api = express.Router()
const mongoose = require('mongoose')

const Company = require ('../models/company.js')
const Offer = require ('../models/offer')
const User = require('../models/user')
const Answer = require ('../models/answer')
const Question = require ('../models/question.js')

api.get('/dropDB', (req,res) => {
  Company.remove({}, function(err) {
    console.log('Company collection removed')
  });
  Offer.remove({}, function(err) {
    console.log('Offer collection removed')
  });
  User.remove({}, function(err) {
    console.log('User collection removed')
  });
  Answer.remove({}, function(err) {
    console.log('Answer collection removed')
  });
  Question.remove({}, function(err) {
    console.log('Question collection removed')
  });
  res.status(200).send("Droped")
})

module.exports = api
