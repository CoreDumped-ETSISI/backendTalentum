'use strict'

const express = require('express')
const api = express.Router()
const mongoose = require('mongoose')
const auth = require('../middlewares/auth')

const config = require('../config')
// const sendgrid = require('sendgrid')(config.user, config.pass)

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

// api.use('/toPDF', auth, (req, res) => {
//   var fs = require('fs');
//   var pdf = require('html-pdf');
//   var html = fs.readFileSync('./cv/index.html', 'utf8');
//   var options = {
//     format: 'Letter'
//   };
//
//   User.findOne({_id:req.user})
//   .exec((err, user) => {
//     console.log(user)
//     html = html.replace("%firstname%", user.firstname)
//     html = html.replace("%firstname%", user.firstname)
//     html = html.replace("%surname%", user.surname)
//     html = html.replace("%surname%", user.surname)
//     html = html.replace("%job%", user.lastJob)
//     html = html.replace("%email%", user.email)
//     html = html.replace("%phone%", user.phone)
//     html = html.replace("%lastJob%", user.lastJob)
//     var skills = []
//     Answer.find({userId: req.user})
//     .populate("questionId")
//     .exec((err, answers) => {
//         if(err) return res.status(500).send({message: `Error on request: ${err}` })
//         if(answers.length == 0){
//           return res.status(404).send({message: `No answers found: ${err}` })
//         }else{
//           for (var i = 0; i < answers.length; i++) {
//             var strs = answers[i].questionId.text.split(" ")
//             var str = strs[strs.length-1]
//             var skill = str.substring(0, str.length - 1)
//             if(answers[i].answer == "Mucho") skills.push(skill)
//           }
//           console.log(skills)
//           for (var i = 0; i < skills.length; i++) {
//             html = html.replace("%skill%", skills[i])
//           }
//           html = html.replace("%education%", user.education)
//           console.log(html)
//           pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
//             if (err) return console.log(err);
//             console.log(res); // { filename: '/app/businesscard.pdf' }
//
//             var base64 = require('file-base64');
//
//             base64.encode('./businesscard.pdf', function(err, base64String) {
//               const sendgrid = require('sendgrid')
//               const helper = sendgrid.mail
//
//               const sendMail = ({
//                   fromEmail = config.mailUser,
//                   toEmail = 'xavikh@gmail.com',
//                   subject = 'CV',
//                   content = 'Aquí teneís mi CV :)',
//                   contentType = 'text/html'
//               }) => {
//                   fromEmail = new helper.Email(fromEmail)
//                   toEmail = new helper.Email(toEmail)
//                   content = new helper.Content(contentType, content)
//
//                   const mail = new helper.Mail(fromEmail, subject, toEmail, content)
//
//                   const attachment = new helper.Attachment()
//
//                   attachment.setType("application/pdf")
//                   attachment.setFilename("CV.pdf")
//                   attachment.setContent(base64String)
//
//                   mail.addAttachment(attachment)
//
//                   const sg = sendgrid(config.SENDGRID_API_KEY)
//                   const request = sg.emptyRequest({
//                       method: 'POST',
//                       path: '/v3/mail/send',
//                       body: mail.toJSON()
//                   })
//
//                   return sg.API(request)
//               }
//               sendMail({})
//                .then((res)=>console.log(res))
//                .catch((err)=>console.log(err))
//
//             });
//
//
//
//
//             //TODO send
//
//
//
//           });
//           res.status(200).send("PdfCreated")
//         }
//
//     })
//
//   })
// })

module.exports = api
