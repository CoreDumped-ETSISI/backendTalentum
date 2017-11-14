'use strict'

const express = require('express')
const api = express.Router()
const mongoose = require('mongoose')
const auth = require('../middlewares/auth')

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

api.use('/toPDF', auth, (req, res) => {
  var fs = require('fs');
  var pdf = require('html-pdf');
  var html = fs.readFileSync('./cv/index.html', 'utf8');
  var options = {
    format: 'Letter'
  };
  User.findOne({_id:req.user})
  .exec((err, user) => {
    console.log(user)
    html = html.replace("%firstname%", user.firstname)
    html = html.replace("%surname%", user.surname)
    html = html.replace("%job%", user.lastJob)
    html = html.replace("%email%", user.email)
    html = html.replace("%phone%", user.phone)
    html = html.replace("%lastJob%", user.lastJob)
    var skills = []
    Answer.find({userId: req.user})
    .populate("questionId")
    .exec((err, answers) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(answers.length == 0){
          return res.status(404).send({message: `No answers found: ${err}` })
        }else{
          for (var i = 0; i < answers.length; i++) {
            var strs = answers[i].questionId.text.split(" ")
            var str = strs[strs.length-1]
            var skill = str.substring(0, str.length - 1)
            if(answers[i].answer == "Mucho") skills.push(skill)
          }
          console.log(skills)
          for (var i = 0; i < skills.length; i++) {
            html = html.replace("%skill%", skills[i])
          }
          html = html.replace("%education%", user.education)
          console.log(html)
          pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
            //TODO send
          });
          res.status(200).send("PdfCreated")
        }

    })

  })
})

module.exports = api
