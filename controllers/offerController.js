'use strict'

const Offer = require ('../models/offer')
const User = require('../models/user')
const Answer = require ('../models/answer')
const config = require('../config')

function createOffer(req, res) {

    var offer = new Offer ({
        title: req.body.title,
        payout: req.body.payout,
        image: req.body.image,
        ubication: req.body.ubication,
        companyName: req.body.companyName,
        industries: req.body.sector,
        description: req.body.description,
        tasks: req.body.tasks,
        questions: req.body.questions
      })

      offer.save(function (err, offer) {
          if(err) return res.status(500).send(err.message);
          res.status(200).send(offer)
      })
}

function listOffers(req, res){
    Offer.find({})
    .populate("questions.question")
    .exec((err, offers) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!offers) return res.status(404).send({message: `No offers found: ${err}` })

        return res.status(200).send(offers)
    })
}

function findOffers(req, res){
    Offer.find(req.query)
    .populate("questions.question")
    .exec((err, offers) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!offers) return res.status(404).send({message: `No offers found: ${err}` })

        return res.status(200).send(offers)
    })
}

function getRandomOffer(req, res){
  User.findOne({_id: req.user})
  .exec((err, user) => {
      if(err) return res.status(500).send({message: `Error on request: ${err}` })
      if(!user) return res.status(404).send({message: `No user found: ${err}` })
      Offer.find({ _id: {$nin: user.offers} })
      .populate("questions.question")
      .exec((err, offers) => {
          if(err) return res.status(500).send({message: `Error on request: ${err}` })
          if(offers.length == 0) return res.status(404).send({message: `No offers found: ${err}` })
          var rand = Math.floor(Math.random() * (offers.length - 0))
          console.log(offers[rand])
          return res.status(200).send(offers[rand])
        })
  })
}

function validateOffer (req, res) {
    var userID = req.user

    Offer.findOne({_id: req.query._id}, (err, offer) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}`})
        if(!offer) return res.status(404).send({message: `No offer was found: ${err}`})

        var choosability = 0
        var questionIDs = []
        var questions = offer.questions
        for(var i = 0; i < questions.length; i++){
            questionIDs.push(questions[i].question)
        }
        Answer.find({$and:[{questionId: {$in : questionIDs}}, {userId: userID}]}, (err, answers) => {
            if(err) return res.status(500).send({message: `Error on request: ${err}`})
            if(!answers) return res.status(404).send({message: `No answer related to selected question was found: ${err}`})

            for(var j = 0 ; j < questions.length; j++){
              if(answers[j]!= undefined){
                console.log("questions at j found: " + questions[j])
                console.log("answers at j found: " + answers[j].answer)
                if(questions[j].answer == (answers[j].answer))
                choosability = choosability + (1/questions.length)*100
              }
            }

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
              html = html.replace("%firstname%", user.firstname)
              html = html.replace("%surname%", user.surname)
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
                      if(answers[i].answer == "Alto") skills.push(skill)
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

                      // var base64 = require('file-base64');
                      //
                      // base64.encode('./businesscard.pdf', function(err, base64String) {
                      //   const sendgrid = require('sendgrid')
                      //   const helper = sendgrid.mail
                      //
                      //   const sendMail = ({
                      //       fromEmail = config.mailUser,
                      //       toEmail = 'xavikh@gmail.com',
                      //       subject = 'CV',
                      //       content = 'Aquí teneís mi CV :)',
                      //       contentType = 'text/html'
                      //   }) => {
                      //       fromEmail = new helper.Email(fromEmail)
                      //       toEmail = new helper.Email(toEmail)
                      //       content = new helper.Content(contentType, content)
                      //
                      //       const mail = new helper.Mail(fromEmail, subject, toEmail, content)
                      //
                      //       const attachment = new helper.Attachment()
                      //
                      //       attachment.setType("application/pdf")
                      //       attachment.setFilename("CV.pdf")
                      //       attachment.setContent(base64String)
                      //
                      //       mail.addAttachment(attachment)
                      //
                      //       const sg = sendgrid(config.SENDGRID_API_KEY)
                      //       const request = sg.emptyRequest({
                      //           method: 'POST',
                      //           path: '/v3/mail/send',
                      //           body: mail.toJSON()
                      //       })
                      //
                      //       return sg.API(request)
                      //   }
                      //   sendMail({})
                      //    .then((res)=>console.log(res))
                      //    .catch((err)=>console.log(err))
                      // });

                    });
                  }
              })
            })
            return res.status(200).send({choosability})
        })
        }
    )
}

module.exports = {
    createOffer,
    listOffers,
    findOffers,
    getRandomOffer,
    validateOffer
}
